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

            <q-btn
              class="custom-button"
              color="primary"
              icon="add"
              @click="adicionarPlano"
              style="position: absolute; right: 0; width: 35px"
            />
          </div>

          <q-table
            v-if="
              !loading &&
              !error
            "
            :rows="planos"
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
                    @click="editarPlano(props.row)"
                  />
                  <q-icon
                    name="delete"
                    class="q-mr-sm action-icon"
                    @click="deletarPlano(props.row.id)"
                  />
                </q-td>

                <q-td class="vertical-line body-cell">
                  {{ props.row.id }}
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.periodo }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.modalidade }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>R$ {{ props.row.valor }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { usePlanosStore } from "src/stores/planosStore";

const router = useRouter();
const store = usePlanosStore();
const search = ref("");

onMounted(() => {
  store.fetchPlanosData();
});

const columns = [
  { name: "btns" },
  { name: "id", label: "ID Plano", align: "left", field: "id" },
  { name: "periodo", label: "Período", align: "left", field: "periodo" },
  { name: "modalidade", label: "Modalidade", align: "left", field: "modalidade" },
  { name: "valor", label: "Valor", align: "left", field: "valor" },
];

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const planos = computed(() => store.planos);

function editarPlano(plano) {
  router.push({
    name: "registerPlano",
    params: { id: plano.id },
  });
}

function adicionarPlano() {
  router.push("/adicionarPlano");
}

async function deletarPlano(planoId) {
  try {
    await store.deletePlano(planoId);
    await store.fetchPlanosData();
  } catch (err) {
    console.error("Erro ao deletar plano:", err);
  }
}
</script>
