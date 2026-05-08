# Contributing

Thanks for helping improve Paid Promo Hider for YouTube.

## Local Setup

No dependencies are required to run the extension locally.

1. Clone the repository.
2. Open `chrome://extensions/`.
3. Enable Developer mode.
4. Click "Load unpacked".
5. Select this repository folder.

## Validation

Run the local validation script before opening a pull request:

```sh
node scripts/smoke-test-content.mjs
node scripts/validate-extension.mjs
```

To create the Web Store upload package:

```sh
bash scripts/package-extension.sh
```

## Pull Requests

Keep changes focused. This extension should remain small, local-only, and free
of analytics, tracking, broad permissions, or remote code.
