# Paid Promo Hider for YouTube™

A simple Chrome extension that hides the "Includes paid promotion" button overlay
on YouTube videos to prevent accidental clicks.

## Why?

The "Includes paid promotion" button appears on sponsored YouTube videos and is
easy to click accidentally, which navigates you away from the video to a Google
support page. This extension removes that button entirely.

## Installation

### From Chrome Web Store

_Coming soon._

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked"
5. Select the folder containing this extension

## Development

This extension has no runtime dependencies and does not use remote code.

```sh
node scripts/smoke-test-content.mjs
node scripts/validate-extension.mjs
bash scripts/package-extension.sh
```

The package script creates a Web Store upload ZIP in `dist/`.

## How It Works

The extension uses a content script that:

- Removes the paid promotion overlay elements from the DOM
- Uses a MutationObserver to catch dynamically loaded overlays as you navigate
  YouTube

## Files

- `manifest.json` - Extension configuration
- `content.js` - Script that removes the overlay elements
- `content.css` - CSS fallback for hiding elements
- `store-assets/` - Chrome Web Store listing assets and submission notes
- `scripts/` - Validation and packaging scripts

## Publishing

Use `STORE_LISTING.md` for the Chrome Web Store listing copy, privacy answers,
review notes, and asset checklist. Before submitting, confirm the ZIP in `dist/`
matches the current `manifest.json` version.

## Privacy

This extension:

- Does NOT collect any user data
- Does NOT make any network requests
- Only runs on youtube.com
- Only modifies the DOM to hide the paid promotion button

See [PRIVACY.md](PRIVACY.md) for the full privacy policy.

## Trademark

YouTube is a trademark of Google LLC. Use of this trademark is subject to
Google Permissions. This project is not affiliated with, endorsed by, sponsored
by, or associated with Google LLC or YouTube.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
