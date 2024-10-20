const path = require('path')
const fs = require('fs').promises
const Track = require ('./Track')

const validExtensionTypes = ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a']

class TrackManager{
    // used for managing added/removed tracks
    constructor(trackDirectory){
        this.trackDirectory = trackDirectory
        this.trackList = []
        this.populateTrackList()
    }

    // used for ensuring the trackList has no duplicate songs
    checkDuplicateTrack(track){
        return this.trackList.some(element => element.getName() === track.getName())
    }

    // adding to the track list
    addToTrackList(track){
        console.log("{+} Attempting to add to TrackManager...")
        if(!this.checkDuplicateTrack(track)){
            this.trackList.push(track)
            console.log(' |-{ Added a new track to TrackManager: ' + track.getName())
            return true
        } 
        console.log(' |-{ Failed adding a new track.')
        return false
    }

    // populates the trackList via searching the 'tracks' folder
    // intended only to be called sparsely.
    async populateTrackList(){
        try{
          const files = await fs.readdir(this.trackDirectory)
          for(const file of files){
            const filePath = path.join(this.trackDirectory, file)
            const stats = await fs.lstat(filePath);
            if(stats.isFile() && validExtensionTypes.includes(path.extname(filePath))){
              // add a new track
              const newTrack = new Track(filePath)
              newTrack.filePath = filePath
              this.addToTrackList(newTrack)
              console.log(`{+} Intialized a track: ${newTrack.getName()}`)
            }
          }
        } catch (error){
            console.error(`{!} Error reading track directory: ${error.message}`)
        }
      }

      // used for cloning an audiofile to the tracks folder
      async cloneAudioFile(filePath){
        try{
          const newTrack = new Track(filePath)
          const newFilePath = path.join(this.trackDirectory, newTrack.getFileName())
          newTrack.filePath = newFilePath
            if(this.addToTrackList(newTrack)){
                await fs.copyFile(filePath, newFilePath)
                console.log(`{+} Successfully cloned track from ${filePath} to ${this.trackDirectory}`)
            }
        } catch (error){
            console.error(`{!} Error cloning file: ${error.message}`)
        }
      }
}

module.exports = TrackManager