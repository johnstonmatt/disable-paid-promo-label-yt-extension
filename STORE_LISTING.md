# Chrome Web Store Listing

Use this file as the source of truth when creating or updating the Chrome Web
Store listing.

## Basic Information

- **Extension name:** Paid Promo Hider for YouTube™
- **Summary:** Hides the paid promotion overlay button on YouTube videos to
  prevent accidental clicks.
- **Category:** Productivity
- **Language:** English
- **Website:** https://github.com/johnstonmatt/disable-paid-promo-label-yt-extension
- **Support URL:** https://github.com/johnstonmatt/disable-paid-promo-label-yt-extension/issues
- **Privacy policy URL:** https://github.com/johnstonmatt/disable-paid-promo-label-yt-extension/blob/main/PRIVACY.md

## Detailed Description

Paid Promo Hider for YouTube™ hides the clickable "Includes paid promotion"
overlay button that appears on some YouTube videos.

The extension is intentionally narrow:

- It only runs on `https://www.youtube.com`
- It uses a local content script and stylesheet
- It does not collect, store, transmit, or sell user data
- It does not make network requests
- It does not use analytics, tracking, or remote code

This is useful if you accidentally click the paid promotion disclosure overlay
while watching videos and get navigated away from the player.

YouTube is a trademark of Google LLC. Use of this trademark is subject to
Google Permissions. This extension is not affiliated with, endorsed by,
sponsored by, or associated with Google LLC or YouTube.

## Privacy Practices Tab

- **Single purpose:** Hide the paid promotion overlay button on YouTube videos
  so it cannot be clicked accidentally.
- **Data usage:** The extension does not collect or use user data.
- **Remote code:** No. All code is included in the extension package.
- **Data sale or transfer:** No.
- **Permissions justification:** The extension runs a local content script and
  stylesheet on `https://www.youtube.com` pages so it can hide the paid
  promotion overlay button. It does not request browser API permissions or broad
  host access.

## Distribution

- **Visibility:** Public
- **Regions:** All regions, unless you intentionally want to limit distribution
- **Pricing:** Free
- **In-app purchases:** No
- **Mature content:** No

## Review Notes

No account, login, or test credentials are required.

To test manually:

1. Install the extension.
2. Open a YouTube video that displays the native "Includes paid promotion"
   overlay.
3. Confirm the paid promotion overlay button is hidden.

The extension has no toolbar popup, options page, background worker, analytics,
tracking, or network requests.

## Assets

- **Icon:** `icons/icon128.png`
- **Screenshot:** `store-assets/screenshot-main-1280x800.png`
- **Small promo tile:** `store-assets/promo-small-440x280.png`
- **Marquee promo tile:** `store-assets/marquee-1400x560.png`

Use the PNG files for the Web Store dashboard. The matching SVG files are source
assets for future edits.
