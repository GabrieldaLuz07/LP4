<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar class="justify-center" style="height: 100px">
          <img src="../img/raio.png" height="90px" width="95px" />
          <q-toolbar-title class="text-center">THUNDER GYM</q-toolbar-title>
          <img src="../img/raio.png" height="90px" width="95px" />
        </q-toolbar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "LayoutLogin",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
