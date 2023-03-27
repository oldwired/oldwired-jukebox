<template>
  <q-page class="column justify-start bg-image">
    <div class="q-pa-md self-center">
      <q-img
        alt="Crazy Eyes"
        src="images/eyes.gif"
        style="width: 240px; height: 180px"
      />
    </div>
    <audioPlayer :songs="songs" />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AudioPlayer from 'pages/AudioPlayer.vue'
// read json data from file
const getSongs = async () => {
  const response = await fetch('data/songs.json')
  const data = await response.json()
  return data
}
const songs = ref([])
onMounted(async () => {
  songs.value = await getSongs()
})

</script>
<style>
.bg-image {
  background-image: url("/images/background.gif");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
