<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: var(--q-primary)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />
        <q-toolbar class="justify-center" style="height: 100px">
          <img src="../img/raio.png" height="90px" width="95px" />
          <q-toolbar-title class="text-center">THUNDER GYM</q-toolbar-title>
          <img src="../img/raio.png" height="90px" width="95px" />
        </q-toolbar>
        <img
          src="../img/saida.png"
          height="35px"
          width="35px"
          @click="leave()"
          style="cursor: pointer"
        />
        <!-- <q-btn flat dense round @click="goTo('login')" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="230"
      :breakpoint="400"
    >
      <q-img
        class="absolute-top q-pa-md flex flex-center column"
        style="
          height: 150px;
          justify-content: center;
          background-color: var(--q-primary);
          border-bottom: 1px solid white;
        "
      >
        <div class="absolute-bottom bg-transparent text-center">
          <q-avatar size="85px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Gabriel da Luz</div>
        </div>
      </q-img>

      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          background-color: var(--q-primary);
        "
      >
        <q-list padding style="height: 100%">
          <q-item class="menu" clickable v-ripple @click="goTo('dashboard')">
            <q-item-section class="itemMenu">Dashboard</q-item-section>
          </q-item>

          <q-item class="menu" clickable v-ripple @click="goTo('modalidades')">
            <q-item-section class="itemMenu">Modalidades</q-item-section>
          </q-item>

          <q-item class="menu" clickable v-ripple @click="goTo('aluno')">
            <q-item-section class="itemMenu">Alunos</q-item-section>
          </q-item>

          <q-item class="menu" clickable v-ripple @click="goTo('professores')">
            <q-item-section class="itemMenu">Professores</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.itemMenu {
  text-align: center;
  color: white;
}

.menu {
  border-bottom: 1px solid white;
}
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const leave = () => {
  router.push("/login");
};

function goTo(routeName) {
  router.push({ name: routeName });
}
</script>
