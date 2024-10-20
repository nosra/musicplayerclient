const fs = require('fs')
const path = require('path')
class Loader{
    static tracksPath = path.join(__dirname, 'tracks')
    static playlistData = path.join(__dirname, 'data/playlists.json')
        // more data to add here later

    static loadPlaylists(){
        const Playlist = require('./Playlist')
        // const PlaylistElement = require('./PlaylistElement')
        const Track = require('./Track')
        const playlistsArr = []
        try{
            console.log(this.playlistData)
            const rawData = fs.readFileSync(this.playlistData)
            const data = JSON.parse(rawData)
            
            data.playlists.forEach(playlist => {
                const objPlaylist = new Playlist(playlist.name)
                for(let i = 0; i < playlist.tracks.length; i++){
                    // initializing new tracks from the filepath property in the json file.
                    const objTrack = new Track(playlist.filePaths[i])
                    objTrack.filePath = playlist.filePaths[i]
                    objPlaylist.addTrackToPlaylist(objTrack)
                }
                playlistsArr.push(objPlaylist)
            });
        } catch(error) {
            console.error('{!} Error intializing playlists from playlists.json:', error)
        }
        return playlistsArr
    }

}

module.exports = Loader