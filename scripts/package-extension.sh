#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

node scripts/validate-extension.mjs

VERSION="$(node -e "const fs = require('fs'); process.stdout.write(JSON.parse(fs.readFileSync('manifest.json', 'utf8')).version)")"
PACKAGE_NAME="paid-promo-hider-for-youtube-${VERSION}.zip"
OUTPUT_DIR="dist"
OUTPUT_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}"
TMP_ZIP="$(mktemp -t paid-promo-hider.XXXXXX).zip"

mkdir -p "$OUTPUT_DIR"

zip -X -q "$TMP_ZIP" \
  manifest.json \
  content.js \
  content.css \
  icons/icon16.png \
  icons/icon48.png \
  icons/icon128.png \
  icons/icon.svg

mv "$TMP_ZIP" "$OUTPUT_PATH"
unzip -t "$OUTPUT_PATH" >/dev/null

echo "Created ${OUTPUT_PATH}"
