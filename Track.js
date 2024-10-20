
class Track{
    constructor(filePath){

        // getting the path to the file
        const path = require('path')
        const fileName = path.basename(filePath)
        this.fileName = fileName

        // get the name of the file
        const choppedName = fileName.split('.').slice(0, -1).join('.');
        this.name = path.basename(choppedName)

        // the location of the file depends on a few factors. for now, it will remained uninitialized
        this.filePath = 'UNINIT'

        // get extension
        this.extension = this.getExtension()
    }

    getName(){
        // returns the name of the track (ex: songname)
        return this.name
    }

    getFileName(){
        // returns the file name of the track (ex: songname.wav)
        return this.fileName
    }

    getFilePath(){
        // returns the file path of the track
        return this.filePath
    }

    getExtension(){
        const lastDotIndex = this.fileName.lastIndexOf('.')
        return lastDotIndex !== -1 ? this.fileName.substring(lastDotIndex + 1) : ''
    }
}

module.exports = Track