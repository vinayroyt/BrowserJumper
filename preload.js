const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openLink: (appPath, url) => ipcRenderer.send('open-link', { appPath, url }),
  getBrowsers: () => ipcRenderer.invoke('get-browsers'),
  getIncomingUrl: () => ipcRenderer.invoke('get-incoming-url')
});
