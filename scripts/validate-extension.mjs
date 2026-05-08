import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function error(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function pngDimensions(relativePath) {
  const filePath = path.join(root, relativePath);
  const buffer = fs.readFileSync(filePath);
  const signature = buffer.subarray(0, 8).toString("hex");

  if (signature !== "89504e470d0a1a0a") {
    error(`${relativePath} is not a PNG file`);
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

const manifestPath = path.join(root, "manifest.json");
let manifest;

try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (caught) {
  error(`manifest.json is not valid JSON: ${caught.message}`);
}

if (manifest) {
  if (manifest.manifest_version !== 3) {
    error("manifest_version must be 3");
  }

  if (!manifest.name || manifest.name.length > 45) {
    error("manifest.name must exist and be 45 characters or fewer");
  }

  if (!/^\d+\.\d+\.\d+$/.test(manifest.version || "")) {
    error("manifest.version must use the x.y.z format");
  }

  if (!manifest.description || manifest.description.length > 132) {
    error("manifest.description must exist and be 132 characters or fewer");
  }

  if (manifest.permissions?.length) {
    warn(`manifest requests permissions: ${manifest.permissions.join(", ")}`);
  }

  if (manifest.host_permissions?.length) {
    warn(
      `manifest requests host_permissions: ${manifest.host_permissions.join(", ")}`,
    );
  }

  const contentScripts = manifest.content_scripts ?? [];

  if (contentScripts.length !== 1) {
    error("manifest should define exactly one content script entry");
  }

  for (const [index, script] of contentScripts.entries()) {
    const matches = script.matches ?? [];

    if (matches.length !== 1 || matches[0] !== "https://www.youtube.com/*") {
      error(
        `content_scripts[${index}].matches must be limited to https://www.youtube.com/*`,
      );
    }

    for (const cssFile of script.css ?? []) {
      if (!fileExists(cssFile)) {
        error(`missing CSS file referenced by manifest: ${cssFile}`);
      }
    }

    for (const jsFile of script.js ?? []) {
      if (!fileExists(jsFile)) {
        error(`missing JS file referenced by manifest: ${jsFile}`);
      }
    }
  }

  const expectedIcons = { 16: "16x16", 48: "48x48", 128: "128x128" };

  for (const [size, iconPath] of Object.entries(manifest.icons ?? {})) {
    if (!fileExists(iconPath)) {
      error(`missing icon referenced by manifest: ${iconPath}`);
      continue;
    }

    const dimensions = pngDimensions(iconPath);
    const expected = expectedIcons[size];

    if (expected && dimensions && `${dimensions.width}x${dimensions.height}` !== expected) {
      error(`${iconPath} must be ${expected}; found ${dimensions.width}x${dimensions.height}`);
    }
  }

  for (const size of Object.keys(expectedIcons)) {
    if (!manifest.icons?.[size]) {
      error(`manifest.icons must include a ${size}px icon`);
    }
  }
}

const requiredDocs = [
  "README.md",
  "LICENSE",
  "PRIVACY.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "STORE_LISTING.md",
];

for (const doc of requiredDocs) {
  if (!fileExists(doc)) {
    error(`missing required repository document: ${doc}`);
  }
}

for (const jsFile of ["content.js"]) {
  const source = readText(jsFile);
  const blockedPatterns = [
    /\beval\s*\(/,
    /\bnew\s+Function\s*\(/,
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bchrome\.scripting\b/,
  ];

  for (const pattern of blockedPatterns) {
    if (pattern.test(source)) {
      error(`${jsFile} contains a disallowed remote-code or network pattern: ${pattern}`);
    }
  }
}

for (const artifact of [
  "store-assets/screenshot-main-1280x800.png",
  "store-assets/promo-small-440x280.png",
  "store-assets/marquee-1400x560.png",
]) {
  if (!fileExists(artifact)) {
    warn(`missing generated listing asset: ${artifact}`);
  }
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length) {
  for (const validationError of errors) {
    console.error(`Error: ${validationError}`);
  }
  process.exit(1);
}

console.log("Extension validation passed.");
