<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Cadastrar Plano</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="salvar">
          <q-select
            v-model="periodo"
            :options="periodoOptions"
            filled
            type="number"
            label="Período (em meses)"
            prepend-icon="event"
            class="q-mb-md"
          />
          <q-select
            v-model="modalidadeId"
            :options="modalidadesOptions"
            filled
            label="Modalidade"
            option-value="nome"
            option-label="nome"
            prepend-icon="layers"
            class="q-mb-md"
            emit-value
          />
          <q-input
            v-model="valor"
            filled
            type="number"
            label="Valor"
            prepend-icon="attach_money"
            class="q-mb-md"
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
import { usePlanosStore } from "src/stores/planosStore";
import { useModalidadesStore } from "src/stores/modalidadesStore";

const route = useRoute();
const router = useRouter();
const planosStore = usePlanosStore();
const modalidadesStore = useModalidadesStore();

const valor = ref(0);
const periodo = ref(null);
const modalidadeId = ref(null);
const modalidadesOptions = ref([]);

const periodoOptions = [
  { label: "Mensal", value: "Mensal" },
  { label: "Trimestral", value: "Trimestral" },
  { label: "Semestral", value: "Semestral" },
  { label: "Anual", value: "Anual" },
];

async function carregarModalidades() {
  try {
    const op = await modalidadesStore.getModalidades();
    modalidadesOptions.value = op.map((mod) => ({
      id: mod.id,
      nome: mod.nome,
    }));
  } catch (error) {
    console.error("Erro ao carregar modalidades:", error);
  }
}

const planoId = ref(route.params.id);

async function carregarDadosPlano() {
  if (planoId.value != null) {
    const plano = await planosStore.getPlanoById(planoId.value);

    if (plano) {
      periodo.value = plano.periodo;
      modalidadeId.value = plano.modalidade;
      valor.value = plano.valor;
    }
  }
}

onMounted(async () => {
  await carregarModalidades();
  await carregarDadosPlano();
});

watch(
  () => route.params.id,
  async (newId) => {
    planoId.value = newId;
    await carregarDadosPlano();
  }
);

async function salvar() {
  try {
    if (planoId.value != null) {
      await planosStore.updatePlano(planoId.value, {
        periodo: periodo.value.value != null ? periodo.value.value : periodo.value,
        modalidade: modalidadeId.value,
        valor: valor.value,
      });
    } else {
      await planosStore.addPlano({
        periodo: periodo.value.value,
        modalidade: modalidadeId.value,
        valor: valor.value,
      });
    }
    router.push("/planos");
  } catch (error) {
    console.error("Erro ao salvar plano:", error);
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
