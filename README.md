# Disable YouTube Paid Promotion Button

A simple Chrome extension that hides the "Includes paid promotion" button
overlay on YouTube videos to prevent accidental clicks.

## Why?

The "Includes paid promotion" button appears on sponsored YouTube videos and is
easy to click accidentally, which navigates you away from the video to a Google
support page. This extension removes that button entirely.

## Installation

### From Chrome Web Store

_(Coming soon)_

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked"
5. Select the folder containing this extension

## How It Works

The extension uses a content script that:

- Removes the paid promotion overlay elements from the DOM
- Uses a MutationObserver to catch dynamically loaded overlays as you navigate
  YouTube

## Files

- `manifest.json` - Extension configuration
- `content.js` - Script that removes the overlay elements
- `content.css` - CSS fallback for hiding elements

## Privacy

This extension:

- Does NOT collect any user data
- Does NOT make any network requests
- Only runs on youtube.com
- Only modifies the DOM to hide the paid promotion button

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
