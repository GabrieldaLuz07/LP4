<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Cadastrar Aluno</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleRegister">
          <q-input
            v-model="username"
            filled
            label="Nome do Aluno"
            prepend-icon="person"
            class="q-mb-md"
          />
          <q-input
            v-model="cpf"
            filled
            label="CPF"
            prepend-icon="person_outline"
            class="q-mb-md"
          />
          <q-input
            v-model="telefone"
            filled
            label="Telefone"
            prepend-icon="lock"
            class="q-mb-md"
          />
          <q-input
            v-model="email"
            filled
            label="E-mail"
            prepend-icon="lock"
            class="q-mb-md"
          />
          <q-input
            v-model="endereco"
            filled
            label="Endereço"
            prepend-icon="lock"
            class="q-mb-md"
          />

          <q-btn
            label="Salvar"
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
const cpf = ref("");
const telefone = ref("");
const email = ref("");
const endereco = ref("");
const router = useRouter();

const goToAluno = () => {
  router.push("/alunos");
};
</script>

<style scoped>
.q-pa-md {
  background-color: #d2d2d2;
}

.q-input {
  border: 1px solid #0894a4;
  padding: 0px;
}
</style>
