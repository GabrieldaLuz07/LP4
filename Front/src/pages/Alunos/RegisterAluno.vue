<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Cadastrar Aluno</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="salvar">
          <q-input
            v-model="nome"
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
          <q-select
            v-model="sexo"
            :options="sexoOptions"
            filled
            label="Sexo"
            prepend-icon="wc"
            class="q-mb-md"
          />
          <q-input
            v-model="nascimento"
            filled
            label="Data de Nascimento"
            type="date"
            prepend-icon="calendar_today"
            class="q-mb-md"
          />
          <q-input
            v-model="telefone"
            filled
            label="Telefone"
            prepend-icon="phone"
            class="q-mb-md"
          />
          <q-input
            v-model="email"
            filled
            label="E-mail"
            prepend-icon="email"
            class="q-mb-md"
          />
          <q-input
            v-model="senha"
            filled
            label="Senha"
            type="password"
            prepend-icon="lock"
            class="q-mb-md"
          />
          <q-select
            v-model="planoId"
            :options="planosOptions"
            filled
            label="Plano"
            option-value="nome"
            option-label="nome"
            prepend-icon="layers"
            class="q-mb-md"
            emit-value
          />

          <q-btn
            label="Salvar"
            type="button"
            color="primary"
            class="full-width q-mb-sm"
            @click="salvar"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAlunosStore } from "src/stores/alunosStore";
import { usePlanosStore } from "src/stores/planosStore";

const route = useRoute();
const router = useRouter();
const store = useAlunosStore();
const planosStore = usePlanosStore();

const nome = ref("");
const cpf = ref("");
const sexo = ref("");
const nascimento = ref("");
const telefone = ref("");
const email = ref("");
const senha = ref("");
const planoId = ref(null);
const planosOptions = ref([]);

const sexoOptions = [
  { label: "Masculino", value: "Masculino" },
  { label: "Feminino", value: "Feminino" },
  { label: "Outro", value: "Outro" },
];

async function carregarPlanos() {
  try {
    const op = await planosStore.getPlanos();
    planosOptions.value = op.map((mod) => ({
      id: mod.id,
      nome: mod.modalidade + " - " + mod.periodo,
    }));
  } catch (error) {
    console.error("Erro ao carregar planos:", error);
  }
}

const alunoId = ref(route.params.id);

async function carregarDadosAluno() {
  const aluno = await store.getAlunoById(alunoId.value);

  if (aluno) {
    nome.value = aluno.nome;
    cpf.value = aluno.cpf;
    sexo.value = aluno.sexo;
    nascimento.value = aluno.nascimento;
    telefone.value = aluno.telefone;
    email.value = aluno.email;
    senha.value = aluno.senha;
    planoId.value = aluno.plano;
  }
}

onMounted(async () => {
  await carregarPlanos();
  await carregarDadosAluno();
});

watch(
  () => route.params.id,
  (newId) => {
    alunoId.value = newId;
    carregarDadosAluno();
  }
);

async function salvar() {
  try {
    if (alunoId.value != null) {
      await store.updateAluno(alunoId.value, {
        nome: nome.value,
        cpf: cpf.value,
        sexo: sexo.value.value != null ? sexo.value.value : sexo.value,
        nascimento: nascimento.value,
        telefone: telefone.value,
        email: email.value,
        senha: senha.value,
        plano: planoId.value,
    });
    } else {
      await store.addAluno({
        nome: nome.value,
        cpf: cpf.value,
        sexo: sexo.value.value,
        nascimento: nascimento.value,
        telefone: telefone.value,
        email: email.value,
        senha: senha.value,
        plano: planoId.value,
      });
    }
    router.push("/alunos");
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
  }
}

</script>

<style scoped>
.q-pa-md {
  background-color: #d2d2d2;
}

.q-input, .q-select {
  border: 1px solid #0894a4;
  padding: 0px;
}
</style>
