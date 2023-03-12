<template>
  <div class="q-pa-md row justify-center q-gutter-x-lg q-gutter-y-lg">
    <q-card
      v-for="(song, index) in songs"
      :key="song.title"
      style="min-width: 400px; max-width: 400px"
      class="transparent"
    >
      <q-card-section
        class="bg-primary text-white"
      >
        <div class="text-h6">
          {{ index + 1 }}: {{ song.title }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <audio
          ref="audioRefs"
          class="fg-primary text-white"
          :src="'/data/'+song.path"
          type="audio/mpeg"
          controls
          preload="none"
          @ended="playNext(index)"
          @play="isPlaying(index)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineProps(['songs'])
const audioRefs = ref([])
function playNext (index) {
  // count of audioRefs
  const count = audioRefs.value.length
  // if last audioRef, play first
  if (index === count - 1) {
    audioRefs.value[index].pause()
    audioRefs.value[index].currentTime = 0
    audioRefs.value[0].currentTime = 0
    audioRefs.value[0].play()
  } else { // play next audioRef
    audioRefs.value[index].pause()
    audioRefs.value[index].currentTime = 0
    audioRefs.value[index + 1].currentTime = 0
    audioRefs.value[index + 1].play()
  }
}
function isPlaying (index) {
  audioRefs.value.forEach((audio, i) => {
    if (i !== index) {
      audio.pause()
      audio.currentTime = 0
    }
  })
}

</script>
