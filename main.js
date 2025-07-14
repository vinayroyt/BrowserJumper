// main.js - Electron entry point for BrowserJumper
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

let mainWindow;
let incomingUrl = null; // URL passed when app is invoked as a default browser
let open; // for dynamic import()

// Create and show the browser picker window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Scan common applications for known browsers
// TODO: make this list externalized
function getInstalledBrowsers() {
  const apps = execSync('ls /Applications | grep -Ei "Chrome|Firefox|Safari|Brave|LibreWolf"')
    .toString()
    .split('\n')
    .filter(name => name.trim().length > 0);

  return apps.map(app => {
    const name = app.replace('.app', '');
    return {
      id: name.toLowerCase().replace(/ /g, ''),
      label: name,
      appName: `/Applications/${app}`
    };
  });
}

// IPC: send list of available browsers to renderer
ipcMain.handle('get-browsers', () => {
  return getInstalledBrowsers();
});

// IPC: return the URL passed to the app
ipcMain.handle('get-incoming-url', () => {
  return incomingUrl;
});

// IPC: open the selected browser with the incoming URL
ipcMain.on('open-link', async (event, { appPath, url }) => {
  if (!open) {
    const mod = await import('open');
    open = mod.default;
  }
  await open(url, { app: { name: appPath } });
  app.quit();
});

// Handle app being launched via URL (from system click)
app.on('open-url', (event, url) => {
  event.preventDefault();
  incomingUrl = url;
  if (mainWindow) {
    mainWindow.webContents.send('incoming-url', url);
  }
});

// Set up and launch the app
app.whenReady().then(() => {
  app.setAsDefaultProtocolClient('http');
  app.setAsDefaultProtocolClient('https');
  createWindow();
});

// Standard macOS lifecycle handling
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});