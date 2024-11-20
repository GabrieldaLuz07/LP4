<template>
  <q-page class="q-pa-md flex flex-center" >
    <q-card class="q-pa-lg" style="width: 800px">
      <q-card-section>
        <div class="text-h4 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="login()">
          <q-input
            v-model="email"
            style="border: 1px solid #0894a4"
            filled
            label="E-mail"
            prepend-icon="person"
            class="q-mb-md"
          />

          <q-input
            v-model="senha"
            type="password"
            style="border: 1px solid #0894a4"
            filled
            label="Senha"
            prepend-icon="lock"
            class="q-mb-md"
          />

          <p id="erroLogin" style="text-align: center; color: red;" hidden>E-mail ou senha inválido. Tente novamente!</p>

          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            class="full-width q-mb-sm"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAlunosStore } from "src/stores/alunosStore";

const email = ref("");
const senha = ref("");
const router = useRouter();
const alunosStore = useAlunosStore();

async function login() {
  try {
    if (await alunosStore.getAlunoLogin(email.value, senha.value))
      router.push("/dashboard");
    else
      document.getElementById("erroLogin").removeAttribute("hidden");
  } catch (error) {
    console.error("Erro ao realizar o login:", error);
  }
};
</script>

<style scoped>
.q-pa-md {
  background-color: #d2d2d2;
}

.full-width {
  width: 100%;
}
</style>
