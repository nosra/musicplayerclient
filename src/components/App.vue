<script setup>
import { ref } from 'vue'
import CreatePlayList from './CreatePlaylist.vue'
import AudioPlayer from './AudioPlayer.vue';

const handleClick = () => {
  window.playlistManage.deleteAllPlaylists()
}

const msg = ref('Hello World!')
</script>

<template>
  <h1>Vue App</h1>
  <div>
    <button @click="handleClick">Click me!</button>
    <CreatePlayList/>
  </div>
  <div>
    <AudioPlayer/>
  </div>
</template>