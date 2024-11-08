<template>
  <q-page class="q-pa-md flex flex-center" style="background-color: #5c5c5c">
    <q-card class="q-pa-lg" style="width: 800px">
      <q-card-section>
        <div class="text-h4 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin">
          <q-input
            v-model="email"
            style="border: 1px solid #0894a4"
            filled
            label="E-mail"
            prepend-icon="person"
            class="q-mb-md"
          />

          <q-input
            v-model="password"
            type="password"
            style="border: 1px solid #0894a4"
            filled
            label="Senha"
            prepend-icon="lock"
            class="q-mb-md"
          />

          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            class="full-width q-mb-sm"
            @click="goToAluno"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = () => {
  if (!username.value || !password.value) {
    return;
  }
};

const goToAluno = () => {
  router.push("/alunos");
};
</script>

<style scoped>
.q-pa-md {
  background-color: #f5f5f5;
}

.full-width {
  width: 100%;
}
</style>
