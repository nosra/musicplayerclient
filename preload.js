const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileManage', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

contextBridge.exposeInMainWorld('playlistManage', {
  createPlaylist: (name) => ipcRenderer.invoke('playlist:createPlaylist', name),
  loadPlaylist: (name) => ipcRenderer.invoke('playlist:loadPlaylist', name),
  deleteAllPlaylists: () => ipcRenderer.send('playlist:deleteAllPlaylists')
})