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
              color="primary"
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
              icon="search"
              style="
                background-color: white;
                width: 12px;
                border-radius: 10px;
                margin-left: 5px;
              "
            />

            <q-btn
              class="custom-button"
              color="primary"
              icon="add"
              @click="adicionarAluno"
              style="position: absolute; right: 0; width: 35px"
            />
          </div>

          <q-table
            v-if="
              alunosFiltrados &&
              alunosFiltrados.length > 0 &&
              !loading &&
              !error
            "
            :rows="alunosFiltrados"
            :columns="columns"
            row-key="id_aluno"
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
                    @click="toggleEdit(props.row)"
                  />
                  <q-icon
                    name="delete"
                    class="q-mr-sm action-icon"
                    @click="deletarAluno(props.row.id_aluno)"
                  />
                </q-td>

                <q-td class="vertical-line body-cell">
                  {{ props.row.id_aluno }}
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.nome"
                    dense
                  />
                  <span v-else>{{ props.row.nome }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.cpf"
                    dense
                  />
                  <span v-else>{{ props.row.cpf }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.telefone"
                    dense
                  />
                  <span v-else>{{ props.row.telefone }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.sexo"
                    dense
                  />
                  <span v-else>{{ props.row.sexo }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.nascimento"
                    dense
                  />
                  <span v-else>{{ props.row.nascimento }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <q-input
                    v-if="
                      editingAluno &&
                      editingAluno.id_aluno === props.row.id_aluno
                    "
                    v-model="editingAluno.cref"
                    dense
                  />
                  <span v-else>{{ props.row.cref }}</span>
                </q-td>

                <q-td
                  v-if="
                    editingAluno && editingAluno.id_aluno === props.row.id_aluno
                  "
                >
                  <q-btn
                    label="Salvar"
                    @click="salvarEdicao(props.row.id_aluno)"
                    color="green"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>

          <div v-else-if="alunosFiltrados && alunosFiltrados.length === 0">
            Nenhum aluno disponível.
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "src/stores/dashboardStore";

const router = useRouter();
const store = useDashboardStore();
const search = ref("");
const editingAluno = ref(null);

onMounted(() => {
  store.fetchDashboardData();
});

const columns = [
  {
    name: "btns",
  },
  {
    name: "id_aluno",
    label: "ID Aluno",
    align: "left",
    field: "id_aluno",
  },
  { name: "nome", label: "Nome", align: "left", field: "nome" },
  { name: "cpf", label: "CPF", align: "left", field: "cpf" },
  { name: "telefone", label: "Telefone", align: "left", field: "telefone" },
  { name: "sexo", label: "Sexo", align: "left", field: "sexo" },
  {
    name: "nascimento",
    label: "Nascimento",
    align: "left",
    field: "nascimento",
  },
  { name: "cref", label: "CREF", align: "left", field: "cref" },
];

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const alunos = computed(() => store.alunos);

const alunosFiltrados = computed(() =>
  alunos.value
    ? alunos.value.filter((alunos) =>
        alunos.nome.toLowerCase().includes(search.value.toLowerCase())
      )
    : []
);

function toggleEdit(alunos) {
  if (editingAlunos.value && editingAlunos.value.id === alunos.id) {
    editingAlunos.value = null;
  } else {
    editingAlunos.value = { ...alunos };
  }
}

async function salvarEdicao(alunosId) {
  try {
    await store.updatealunos(alunosId, editingAlunos.value);
    editingAlunos.value = null;
    store.fetchalunosData();
  } catch (err) {
    console.error("Erro ao atualizar o aluno:", err);
  }
}

function adicionarAluno() {
  router.push("/adicionarAluno");
}

async function deletarAluno(alunosId) {
  try {
    await store.deletarAluno(alunosId);
    store.fetchAlunosData();
  } catch (err) {
    console.error("Erro ao deletar aluno:", err);
  }
}
</script>
