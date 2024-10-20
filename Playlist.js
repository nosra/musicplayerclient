const Track = require ('./Track')
const PlaylistElement = require('./PlaylistElement')
const fs = require('fs')
const path = require('path')
class Playlist{
    constructor(name){
        // contains a playlist of playlist elements for rearranging, etc.
        this.name = name
        this.playlist = []
        this.filePath = path.join(__dirname, 'data/playlists.json')
    }
    
    addTrackToPlaylist(track){
        const len = this.playlist.length
        const playlistElement = new PlaylistElement(track, len)
        this.playlist.push(playlistElement)
    }

    read(){
        try {
            const rawData = fs.readFileSync(this.filePath);
            return JSON.parse(rawData);
        } catch (error) {
            console.error('{!} Error reading data file:', error);
            return { playlists: [] };
        }
    }

    save(){
        // we need to build a string to add to the playlists.json
        const tracksFromList = this.playlist.map(pListElement => pListElement.track.name)
        const filePathsFromList = this.playlist.map(pListElement => pListElement.track.filePath)
        const playlistInfo = {
            name: this.name,
            tracks: tracksFromList,
            filePaths: filePathsFromList
        }
        try{
            const data = this.read()
            data.playlists.push(playlistInfo)
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
            console.log('{+} Saved playlist data.')
        } catch (error){
            console.error('{!} Error writing to file:', error)
        }
        
    }
}

module.exports = Playlist