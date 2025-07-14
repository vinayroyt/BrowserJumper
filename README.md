# BrowserJumper

**BrowserJumper** is a lightweight macOS app built with Electron that intercepts links (as the default browser) and lets users choose which installed browser to open them with — useful for developers, testers, and browser power-users.

---

## Features
- Intercepts `http`/`https` links
- Presents a simple UI to choose from installed browsers
- Opens the selected browser with the clicked link
- Uses CSS-styled tiles for browsers instead of image icons
- Works as a default browser replacement

---

## Installation

1. Clone or download the project:
```bash
cd BrowserJumper
npm install
```

2. Build the app:
```bash
npm run dist
```

3. Move the built app into `/Applications`:
```bash
mv dist/mac-<arch>/BrowserJumper.app /Applications/
```

4. Launch it once:
```bash
open -a /Applications/BrowserJumper.app
```

5. Go to **System Settings > Desktop & Dock > Default Web Browser** and select **BrowserJumper**.

---

## Development

Run in development mode:
```bash
npm start
```

Make edits in `main.js`, `index.html`, and `preload.js`.

---

## License
MIT

---

## Credits
Created using Electron, with open-source modules like `open` and `electron-builder`.

Icons were replaced with styled CSS buttons for simplicity and speed.
