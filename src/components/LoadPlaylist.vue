<template>
    <body>
      <h3>Load Playlist</h3>
      <input type="text" v-model="inputValue" placeholder="Enter Playlist Name..." />
      <button @click="handleClick">Load Playlist</button>
    </body>
</template>
  
<script setup>
    import { ref, defineEmits } from 'vue';
    const emit = defineEmits()
    const inputValue = ref('')
    const handleClick = async () => {
    if (inputValue.value === '') return
    console.log('Loading playlist:', inputValue.value)
    try {
        const playlistObj = await window.playlistManage.loadPlaylist(inputValue.value);
        console.log("FOUND PLAYLIST, LOADING")
        emit('loadPlaylistEvent', playlistObj);
    } catch (error) {
        console.error('Error loading playlist:', error);
    }
  }
</script>
  
<style scoped>
  button {
    background-color: #2AFC98;
    padding: 10px;
    border-radius: 5px;
  }
  div{
    border: 1px solid red;
  }
</style>