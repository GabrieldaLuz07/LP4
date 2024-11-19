<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Cadastrar Modalidade</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSave">
          <q-input
            v-model="nome"
            filled
            label="Nome"
            prepend-icon="label"
            class="q-mb-md"
          />
          <q-input
            v-model="descricao"
            filled
            label="Descrição"
            prepend-icon="description"
            class="q-mb-md"
          />
          <q-input
            v-model="horaInicio"
            filled
            label="Hora Início"
            type="time"
            prepend-icon="access_time"
            class="q-mb-md"
          />
          <q-input
            v-model="horaFim"
            filled
            label="Hora Fim"
            type="time"
            prepend-icon="access_time"
            class="q-mb-md"
          />
          <q-input
            v-model="capacidadeMaxima"
            filled
            label="Capacidade Máxima"
            type="number"
            prepend-icon="people"
            class="q-mb-md"
          />
          <q-input
            v-model="diasSemana"
            filled
            label="Dias da Semana"
            prepend-icon="event"
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
import { useModalidadesStore } from "src/stores/modalidadesStore";

const route = useRoute();
const router = useRouter();
const store = useModalidadesStore();

const nome = ref("");
const descricao = ref("");
const horaInicio = ref("");
const horaFim = ref("");
const capacidadeMaxima = ref(0);
const diasSemana = ref("");

const modalidadeId = ref(route.params.id);

async function carregarDadosModalidade() {
  const modalidade = await store.getModalidadeById(modalidadeId.value);

  if (modalidade) {
    nome.value = modalidade.nome;
    descricao.value = modalidade.descricao;
    horaInicio.value = modalidade.hora_inicio;
    horaFim.value = modalidade.hora_fim;
    capacidadeMaxima.value = modalidade.capacidademaxima;
    diasSemana.value = modalidade.diassemana;
  }
}

onMounted(carregarDadosModalidade);

watch(
  () => route.params.id,
  (newId) => {
    modalidadeId.value = newId;
    carregarDadosModalidade();
  }
);

async function handleSave() {
  try {
    if (modalidadeId.value != null) {
      await store.updateModalidade(modalidadeId.value, {
        nome: nome.value,
        descricao: descricao.value,
        hora_inicio: horaInicio.value,
        hora_fim: horaFim.value,
        capacidademaxima: capacidadeMaxima.value,
        diassemana: diasSemana.value,
      });
    } else {
      await store.addModalidade({
        nome: nome.value,
        descricao: descricao.value,
        hora_inicio: horaInicio.value,
        hora_fim: horaFim.value,
        capacidademaxima: capacidadeMaxima.value,
        diassemana: diasSemana.value,
      });
    }
    router.push("/modalidades");
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
