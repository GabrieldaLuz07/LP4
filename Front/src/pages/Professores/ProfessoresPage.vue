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
            <label style="color: black; font-size: 18px">Nome</label>
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
              @click="adicionarProfessor"
              style="position: absolute; right: 0; width: 35px"
            />
          </div>

          <q-table
            v-if="
              professoresFiltrados &&
              professoresFiltrados.length > 0 &&
              !loading &&
              !error
            "
            :rows="professoresFiltrados"
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
                    @click="editarProfessor(props.row)"
                  />
                  <q-icon
                    name="delete"
                    class="q-mr-sm action-icon"
                    @click="deletarProfessor(props.row.id)"
                  />
                </q-td>

                <q-td class="vertical-line body-cell">
                  {{ props.row.id }}
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.nome }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.cpf }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.sexo }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.nascimento }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.telefone }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.cref }}</span>
                </q-td>

              </q-tr>
            </template>
          </q-table>

          <div v-else-if="professoresFiltrados && professoresFiltrados.length === 0">
            Nenhum professores disponível.
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useProfessoresStore } from "src/stores/professoresStore";

const router = useRouter();
const store = useProfessoresStore();
const search = ref("");

onMounted(() => {
  store.fetchProfessoresData();
});

const columns = [
  { name: "btns" },
  { name: "id", label: "ID Professor", align: "left", field: "id" },
  { name: "nome", label: "Nome", align: "left", field: "nome" },
  { name: "cpf", label: "CPF", align: "left", field: "cpf" },
  { name: "sexo", label: "Sexo", align: "left", field: "sexo" },
  { name: "nascimento", label: "Nascimento", align: "left", field: "nascimento" },
  { name: "telefone", label: "Telefone", align: "left", field: "telefone" },
  { name: "cref", label: "CREF", align: "left", field: "cref" },
];

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const professores = computed(() => store.professores);

const professoresFiltrados = computed(() =>
  professores.value
    ? professores.value.filter((professores) =>
        professores.nome.toLowerCase().includes(search.value.toLowerCase())
      )
    : []
);

function editarProfessor(professor) {
  router.push({
    name: "registerProfessor",
    params: { id: professor.id },
  });
}

function adicionarProfessor() {
  router.push("/adicionarProfessor");
}

async function deletarProfessor(professoresId) {
  try {
    await store.deleteProfessor(professoresId);
    await store.fetchProfessoresData();
  } catch (err) {
    console.error("Erro ao deletar professores:", err);
  }
}
</script>
