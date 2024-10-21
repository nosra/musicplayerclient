
<template>
    <div class="audio-player">
      <LoadPlaylist @loadPlaylistEvent="handleLoadPlaylist"/>
      <audio ref="audioElement" :src="src" @timeupdate="updateProgress" @ended="handleEnded" />
      <div class="controls">
        <button @click="play" :disabled="isPlaying">Play</button>
        <button @click="pause" :disabled="!isPlaying">Pause</button>
        <button @click="stop">Stop</button>
        <button @click="next">Next</button>
        <input type="range" v-model="volume" @input="changeVolume" min="0" max="1" step="0.01" />
        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        <input type="range" v-model="progress" @input="seek" min="0" max="100" />
      </div>
    </div>
</template>
  
  <script>
  import { handleError, ref, watch } from 'vue'
  import LoadPlaylist from './LoadPlaylist.vue'

  export default {
    components: {
      LoadPlaylist
    },
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const playlist = ref([])
      const audioElement = ref(null)
      const isPlaying = ref(false)
      const volume = ref(1)
      const currentTime = ref(0)
      const duration = ref(0)
      const progress = ref(0)

      const currentPosition = ref(0)
  
      const play = () => {
        audioElement.value.play()
        isPlaying.value = true
      };
  
      const pause = () => {
        audioElement.value.pause()
        isPlaying.value = false
      };
  
      const stop = () => {
        audioElement.value.pause()
        audioElement.value.currentTime = 0
        isPlaying.value = false
      };

      const next = () => {
        if(playlist === null) return
        currentPosition.value += 1
        console.log("playlist.value[0].track.name: " + playlist.value[0].track.filePath)
        audioElement.value.src = playlist.value[currentPosition.value].track.filePath
      }
  
      const changeVolume = () => {
        audioElement.value.volume = volume.value
      };
  
      const updateProgress = () => {
        currentTime.value = audioElement.value.currentTime
        duration.value = audioElement.value.duration || 0
        progress.value = (currentTime.value / duration.value) * 100
      };
  
      const seek = () => {
        audioElement.value.currentTime = (progress.value / 100) * duration.value
      };
  
      const handleEnded = () => {
        isPlaying.value = false
        currentTime.value = 0
        progress.value = 0
      };
  
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      };

      const handleLoadPlaylist = (playlistObj) => {
        const playlistArr = playlistObj.playlist
        console.log(playlistArr)
        playlist.value = playlistArr
        audioElement.value.src = playlistArr[0].track.filePath
      }
  
      watch(() => props.src, () => {
        if (audioElement.value) {
          audioElement.value.src = props.src
          audioElement.value.load()
        }
      });
      
  
      return {
        playlist,
        audioElement,
        isPlaying,
        volume,
        currentTime,
        currentPosition,
        duration,
        progress,
        play,
        pause,
        stop,
        next,
        changeVolume,
        updateProgress,
        seek,
        formatTime,
        handleLoadPlaylist
      };
    }
    
  };
  </script>
  
  <style scoped>
  .audio-player {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .controls {
    display: flex;
    align-items: center;
  }
  button {
    margin: 0 5px;
  }
  input[type="range"] {
    margin: 0 10px;
  }
  </style>