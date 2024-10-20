const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileManage', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

contextBridge.exposeInMainWorld('playlistManage', {
  createPlaylist: () => ipcRenderer.invoke('playlist:createPlaylist'),
  displayPlaylist: () => ipcRenderer.invoke('playlist:displayPlaylist')
})