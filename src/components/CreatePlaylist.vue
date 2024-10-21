<template>
    <div>
      <h3>Create Playlist</h3>
      <input type="text" v-model="inputValue" placeholder="Enter Playlist Name..." />
      <button @click="handleClick">Create Playlist</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// check the value to create a playlist...
const inputValue = ref('')
const handleClick = async () => {
    if(inputValue.value === '')
        return
    await window.playlistManage.createPlaylist(inputValue.value)
}
</script>

<style scope>
button {
  background-color: #2AFC98;
  padding: 20px;
  border-radius: 10px;
}

button:hover{
    background-color: #09E85E;
}

input {
  background-color: #16C172;
  padding: 20px;
  border-radius: 10px;
}
</style>

