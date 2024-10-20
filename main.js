// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')

const path = require('node:path')
const os = require('node:os');
const fs = require('node:fs');

// custom classes
const Track = require ('./Track')
const TrackManager = require('./TrackManager')
const Loader = require('./Loader')

// track files
const validExtensionTypes = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a']
const trackDirectory = path.join(__dirname, 'tracks')

// initializing the track manager
const trackManager = new TrackManager(trackDirectory)

// initializing the saved playlists
const playlists = Loader.loadPlaylists()
console.log('{+} Preloaded playlists: ')
playlists.forEach(playlist => {
  console.log(" |-{ " + playlist.name)
})

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // titleBarStyle: 'hidden',
    titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: 30
    },
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Audio Files', extensions: validExtensionTypes }]
    })

    // use the track manager to handle this file
    await trackManager.cloneAudioFile(result.filePaths[0]);
    return trackManager.trackList[0].getFilePath()
});


// creates a playlist FROM EVERY UPLOADED TRACK (TODO: add more granularity)
ipcMain.handle('playlist:createPlaylist', async (event, name) => {
  console.log(name)
  const Playlist = require('./Playlist')
  const playlistObj = new Playlist(name)
  // just going to add every track we have into this playlist (woohoo!)
  trackManager.trackList.forEach(track => {
    playlistObj.addTrackToPlaylist(track)
  })
  console.log('{+} Created new playlist: ')
  playlistObj.playlist.forEach(playlistElement => {
    console.log(`{+} Song: ${playlistElement.track.getName()} | Position: ${playlistElement.position}`)
  })
  
  if(playlistObj.playlist.length != 0){
    // add to playlist list
    playlists.push(playlistObj)

    // save to json file
    playlistObj.save()
  }
})


// returns a playlist
ipcMain.handle('playlist:displayPlaylist', async (event, name) => {
  let playlist = playlists.find(p => p.name === name)
  return playlist
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// deletes all the saved playlists
ipcMain.on('playlist:deleteAllPlaylists', () => {
  const Playlist = require('./Playlist')
  playlists.length = 0
  Playlist.deleteAllPlaylists()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
