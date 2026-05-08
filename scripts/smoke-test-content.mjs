import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "content.js"), "utf8");
const queriedSelectors = [];
const removedSelectors = [];
let observedTarget = null;
let observedOptions = null;

class FakeMutationObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target, options) {
    observedTarget = target;
    observedOptions = options;
    this.callback();
  }
}

const document = {
  body: { nodeName: "BODY" },
  documentElement: { nodeName: "HTML" },
  addEventListener() {
    throw new Error("DOMContentLoaded listener should not be needed when body exists");
  },
  querySelectorAll(selector) {
    queriedSelectors.push(selector);
    return [
      {
        remove() {
          removedSelectors.push(selector);
        },
      },
    ];
  },
};

vm.runInNewContext(source, {
  document,
  MutationObserver: FakeMutationObserver,
});

assert.deepEqual(queriedSelectors.slice(0, 3), [
  ".ytp-paid-content-overlay",
  ".ytp-paid-content-overlay-link",
  ".ytmPaidContentOverlayHost",
]);
assert.deepEqual(queriedSelectors.slice(3, 5), [
  "ytm-paid-content-overlay-renderer",
  'a[href*="support.google.com/youtube"][href*="ppp"]',
]);
assert.equal(removedSelectors.length, 10);
assert.equal(observedTarget, document.body);
assert.equal(observedOptions.childList, true);
assert.equal(observedOptions.subtree, true);

console.log("Content script smoke test passed.");
