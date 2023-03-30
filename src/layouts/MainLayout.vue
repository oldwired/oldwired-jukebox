<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/icon.png">
          </q-avatar>
          oldwired Jukebox
        </q-toolbar-title>

        <div />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row justify-end">
            <div class="col">
              {{ new Date().getUTCFullYear() }} - oldwired
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>

</script>
