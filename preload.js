const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('computerCheck', {
  startCheck: () => ipcRenderer.invoke('computerCheckStart'),
})

contextBridge.exposeInMainWorld('fileManage', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})