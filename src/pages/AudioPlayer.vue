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
        :class="{ 'bg-accent': playingAudio[index] }"
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
            @click="toggleHidden(index)"
          />
        </div>
      </q-card-section>
      <q-card-section
        ref="audioSectionRefs"
        :class="{ hidden:!showingAudio[index] }"
      >
        <audio
          ref="audioRefs"
          class="fg-primary text-white"
          :src="'data/'+song.path"
          type="audio/mpeg"
          controls
          preload="none"
          @ended="playNext(index)"
          @play="isPlaying(index)"
          @volumechange="volumeChanging(index)"
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
import { audioInfoStore } from 'stores/audio_info'
defineProps(['songs'])
const audioRefs = ref([])
const btnRefs = ref([])
const audioSectionRefs = ref([])
const playingAudio = ref([])
const showingAudio = ref([])
const audioInfo = audioInfoStore()

function doStopPosZero (index) {
  audioRefs.value[index].currentTime = 0
  doStop(index)
}

function doPlaySetZero (index) {
  audioRefs.value[index].currentTime = 0
  doPlay(index)
}

function playNext (index) {
  // count of audioRefs
  const count = audioRefs.value.length
  doStopPosZero(index)
  // if last audioRef, play first
  if (index === count - 1) {
    doPlaySetZero(0)
  } else { // play next audioRef
    doPlaySetZero(index + 1)
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

function doStop (index) {
  audioRefs.value[index].pause()
  playingAudio.value[index] = false
}

function doPlay (index) {
  audioRefs.value[index].volume = audioInfo.volume
  audioRefs.value[index].play()
  playingAudio.value[index] = true
}

function togglePlay (index) {
  if (playingAudio.value[index]) {
    doStop(index)
  } else {
    doPlay(index)
  }
}
function getPlayButtonIcon (index) {
  return playingAudio.value[index] ? 'pause' : 'play_arrow'
}
function toggleHidden (index) {
  showingAudio.value[index] = !showingAudio.value[index]
}
function volumeChanging (index) {
  audioInfo.volume = audioRefs.value[index].volume
}
</script>
