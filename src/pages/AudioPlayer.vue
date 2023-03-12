<template>
  <div
    v-if="songs.length>0"
    class="q-pa-md row justify-center q-gutter-x-lg q-gutter-y-lg"
  >
    <q-card
      v-for="(song, index) in songs"
      :key="song.title"
      style="min-width: 400px; max-width: 400px"
      class="transparent"
    >
      <q-card-section
        class="row bg-primary text-white justify-between"
      >
        <div class="text-h6">
          {{ index + 1 }}: {{ song.title }}
        </div>
        <div>
          <q-btn
            ref="btnRefs"
            flat
            round
            :icon="getPlayButtonIcon(index)"
            @click="togglePlay(index)"
          />
          <q-btn
            flat
            round
            icon="more_horiz"
            @click="
              audioRefs[index].pause()"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        ref="audioSectionRefs"
        :class="{ hidden: !playingAudio[index] }"
      >
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
  <div
    v-else
    class="q-pa-md row justify-center q-gutter-x-lg q-gutter-y-lg"
  >
    <q-card
      style="min-width: 400px; max-width: 400px"
      class="transparent"
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          No songs found
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineProps(['songs'])
const audioRefs = ref([])
const btnRefs = ref([])
const audioSectionRefs = ref([])
const playingAudio = ref([])
function playNext (index) {
  // count of audioRefs
  const count = audioRefs.value.length
  // if last audioRef, play first
  if (index === count - 1) {
    audioRefs.value[index].pause()
    audioRefs.value[index].currentTime = 0
    playingAudio.value[index] = false
    audioRefs.value[0].currentTime = 0
    audioRefs.value[0].play()
    playingAudio.value[0] = true
  } else { // play next audioRef
    audioRefs.value[index].pause()
    audioRefs.value[index].currentTime = 0
    playingAudio.value[index] = false
    audioRefs.value[index + 1].currentTime = 0
    audioRefs.value[index + 1].play()
    playingAudio.value[index + 1] = true
  }
}
function isPlaying (index) {
  audioRefs.value.forEach((audio, i) => {
    if (i !== index) {
      audio.pause()
      audio.currentTime = 0
      playingAudio.value[i] = false
    }
  })
}
function togglePlay (index) {
  if (playingAudio.value[index]) {
    audioRefs.value[index].pause()
    playingAudio.value[index] = false
  } else {
    audioRefs.value[index].play()
    playingAudio.value[index] = true
  }
}
function getPlayButtonIcon (index) {
  return playingAudio.value[index] ? 'pause' : 'play_arrow'
}
</script>