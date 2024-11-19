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
                    @click="editarAluno(props.row)"
                  />
                  <q-icon
                    name="delete"
                    class="q-mr-sm action-icon"
                    @click="deletarAluno(props.row.id)"
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
                  <span>{{ props.row.telefone }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.sexo }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.nascimento }}</span>
                </q-td>

                <q-td class="vertical-line body-cell">
                  <span>{{ props.row.modalidade }}</span>
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
import { useAlunoStore } from "src/stores/alunosStore";

const router = useRouter();
const store = useAlunoStore();
const search = ref("");

onMounted(() => {
  store.fetchAlunosData();
});

const columns = [
  { name: "btns" },
  { name: "id", label: "ID Aluno", align: "left", field: "id" },
  { name: "nome", label: "Nome", align: "left", field: "nome" },
  { name: "cpf", label: "CPF", align: "left", field: "cpf" },
  { name: "sexo", label: "Sexo", align: "left", field: "sexo" },
  { name: "nascimento", label: "Nascimento", align: "left", field: "nascimento" },
  { name: "email", label: "E-mail", align: "left", field: "email" },
  { name: "telefone", label: "Telefone", align: "left", field: "telefone" },
  { name: "modalidade", label: "Modalidade", align: "left", field: "modalidade" }
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

function editarAluno(aluno) {
  router.push({
    name: "registerAluno",
    params: { id: aluno.id },
  });
}

function adicionarAluno() {
  router.push("/adicionarAluno");
}

async function deletarAluno(alunosId) {
  try {
    await store.deletarAluno(alunosId);
    await store.fetchAlunosData();
  } catch (err) {
    console.error("Erro ao deletar aluno:", err);
  }
}
</script>
