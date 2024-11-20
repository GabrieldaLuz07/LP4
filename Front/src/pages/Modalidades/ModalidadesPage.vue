<template>
  <div>
    <q-layout view="hHh Lpr lFf" container style="height: 100vh">
      <q-page-container style="background-color: #d2d2d2">
        <q-page class="q-px-lg q-py-md">
          <q-spinner v-if="loading" size="30px" color="primary" />
          <div v-if="error" class="text-negative">{{ error }}</div>

          <div
            class="row q-mb-md"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              width: 100%;
            "
          >
            <label style="color: black; font-size: 18px">Modalidade</label>
            <q-input
              v-model="search"
              debounce="300"
              class="custom-input"
              style="
                width: 480px;
                border: 2px solid var(--q-primary);
                border-radius: 10px;
                background-color: white;
                margin-left: 5px;
              "
            />

            <q-btn
              class="custom-button"
              color="primary"
              icon="add"
              @click="adicionarModalidade"
              style="position: absolute; right: 0; width: 35px"
            />
          </div>

          <q-table
            v-if="
              modalidadesFiltradas &&
              modalidadesFiltradas.length > 0 &&
              !loading &&
              !error
            "
            :rows="modalidadesFiltradas"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[5, 10, 20]"
            class="custom-table"
          >
            <template v-slot:header="props">
              <q-tr
                class="header-row"
                style="background-color: var(--q-primary)"
              >
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="header-cell vertical-line"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" class="body-row">
                <q-td class="vertical-line body-cell">
                  <q-icon
                    name="edit"
                    class="q-mr-sm action-icon"
                    @click="editarModalidade(props.row)"
                  />
                  <q-icon
                    name="delete"
                    class="q-mr-sm action-icon"
                    @click="deletarModalidade(props.row.id)"
                  />
                </q-td>

                <q-td class="vertical-line body-cell">
                  {{ props.row.id }}
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.nome }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.descricao }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.hora_inicio }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.hora_fim }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.capacidademaxima }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.diassemana }}</span>
                </q-td>

              </q-tr>
            </template>
          </q-table>

          <div v-else-if="modalidadesFiltradas && modalidadesFiltradas.length === 0">
            Nenhuma modalidade disponível.
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useModalidadesStore } from "src/stores/modalidadesStore";

const router = useRouter();
const store = useModalidadesStore();
const search = ref("");

onMounted(() => {
  store.fetchModalidadesData();
});

const columns = [
  { name: "btns", label: "Ações" },
  { name: "id", label: "ID Modalidade", align: "left", field: "id" },
  { name: "nome", label: "Nome", align: "left", field: "nome" },
  { name: "descricao", label: "Descrição", align: "left", field: "descricao" },
  { name: "hora_inicio", label: "Hora Início", align: "left", field: "hora_inicio" },
  { name: "hora_fim", label: "Hora Fim", align: "left", field: "hora_fim" },
  { name: "capacidademaxima", label: "Capacidade Máxima", align: "left", field: "capacidademaxima" },
  { name: "diassemana", label: "Dias da Semana", align: "left", field: "diassemana" },
];

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const modalidades = computed(() => store.modalidades);

const modalidadesFiltradas = computed(() =>
  modalidades.value
    ? modalidades.value.filter((modalidade) =>
        modalidade.nome.toLowerCase().includes(search.value.toLowerCase())
      )
    : []
);

function editarModalidade(modalidade) {
  router.push({
    name: "registerModalidade",
    params: { id: modalidade.id },
  });
}

function adicionarModalidade() {
  router.push("/adicionarModalidade");
}

async function deletarModalidade(modalidadeId) {
  try {
    await store.deleteModalidade(modalidadeId);
    await store.fetchModalidadesData();
  } catch (err) {
    console.error("Erro ao deletar modalidade:", err);
  }
}
</script>
