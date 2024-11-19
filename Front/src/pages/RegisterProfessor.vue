<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Cadastrar Professor</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSave">
          <q-input
            v-model="nome"
            filled
            label="Nome"
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
            v-model="sexo"
            filled
            label="Sexo"
            prepend-icon="lock"
            class="q-mb-md"
          />
          <q-input
            v-model="nascimento"
            filled
            label="Nascimento"
            prepend-icon="lock"
            class="q-mb-md"
          />
          <q-input
            v-model="cref"
            filled
            label="CREF"
            prepend-icon="lock"
            class="q-mb-md"
          />

          <q-btn
            label="Salvar"
            type="button"
            color="primary"
            class="full-width q-mb-sm"
            @click="handleSave"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfessoresStore } from "src/stores/professoresStore";

const route = useRoute();
const router = useRouter();
const store = useProfessoresStore();

const nome = ref("");
const cpf = ref("");
const telefone = ref("");
const sexo = ref("");
const nascimento = ref("");
const cref = ref("");

const professorId = ref(route.params.id);

async function carregarDadosProfessor() {
  const professor = await store.getProfessorById(professorId.value);

  if (professor) {
    nome.value = professor.nome;
    cpf.value = professor.cpf;
    telefone.value = professor.telefone;
    sexo.value = professor.sexo;
    nascimento.value = professor.nascimento;
    cref.value = professor.cref;
  }
}

onMounted(carregarDadosProfessor);

watch(
  () => route.params.id,
  (newId) => {
    professorId.value = newId;
    carregarDadosProfessor();
  }
);

async function handleSave() {
  try {
    if (professorId.value != null) {
      await store.updateProfessor(professorId.value, {
        nome: nome.value,
        cpf: cpf.value,
        telefone: telefone.value,
        sexo: sexo.value,
        nascimento: nascimento.value,
        cref: cref.value,
      });
    } else {
      await store.addProfessor({
        nome: nome.value,
        cpf: cpf.value,
        telefone: telefone.value,
        sexo: sexo.value,
        nascimento: nascimento.value,
        cref: cref.value,
      });
    }
    router.push("/professores");
  } catch (error) {
    console.error("Erro ao salvar alterações:", error);
  }
}

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
