import { defineStore } from 'pinia'

export const audioInfoStore = defineStore('volume', {
  state: () => ({
    volume: 0.5
  })
})
