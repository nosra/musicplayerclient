document.getElementById('upload-button').onclick = async (event) => {
    event.preventDefault()
    const filePath = await window.fileManage.openFile()
    // console.log('[+] Selected File Path: ', filePath)
    // get the audio player and audio source
    // const audioPlayer = document.getElementById('audio-player')
    //const audioSource = document.getElementById('audio-source1')
    // change the source audio
    //audioSource.src = filePath
    // load it into the audio player
    //audioPlayer.load()
}

document.getElementById('create-playlist').onclick = async (event) => {
    await window.playlistManage.createPlaylist()
}

function createAudioPlayer(track, audioContainer, i){
    console.log(track.extension)
    // new audio element
    const audio = document.createElement('audio');
    audio.id = 'audio-player-' + i
    audio.controls = true; 

    // new audio source
    const audioSource = document.createElement('source')
    audioSource.src = track.filePath
    audioSource.type = 'audio/' + track.extension

    // container
    const playerContainer = document.createElement('div');
    playerContainer.style.marginBottom = '20px';

    // label for player
    const label = document.createElement('label');
    label.textContent = `Track: ${track.name}`;
    label.style.display = 'block';

    // populate container
    playerContainer.appendChild(label);
    playerContainer.appendChild(audio);
    audio.appendChild(audioSource)

    // append the player container to the main audio container
    audioContainer.appendChild(playerContainer);

    // intialize the audio player
    audio.load()
}

document.getElementById('display-playlist').onclick = async (event) => {
    const playlistMaster = await window.playlistManage.displayPlaylist()
    const playlist = playlistMaster.playlist
    // here we go
    for(let i = 0; i < playlist.length; i++){
        track = playlist[i].track
        createAudioPlayer(track, document.getElementById('audio-container'), i);
    }
}