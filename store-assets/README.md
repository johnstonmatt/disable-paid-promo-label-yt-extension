# Store Assets

PNG files in this directory are ready for the Chrome Web Store dashboard. The
matching SVG files are editable sources.

- `screenshot-main-1280x800.png` - main listing screenshot
- `promo-small-440x280.png` - small promotional tile
- `marquee-1400x560.png` - marquee promotional tile

Regenerate PNGs from the SVG sources with:

```sh
/opt/homebrew/bin/timeout 20 '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless=new \
  --disable-gpu \
  --no-first-run \
  --user-data-dir=/private/tmp/chrome-headless-codex-assets \
  --screenshot=store-assets/promo-small-440x280.png \
  --window-size=440,280 \
  file://$PWD/store-assets/promo-small.svg
```

Adjust the screenshot path, window size, and SVG file for the other assets.
