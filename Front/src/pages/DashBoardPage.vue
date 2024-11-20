<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-card class="q-pa-lg text-center">
          <q-card-section>
            <div class="text-h5">Alunos por Período</div>
          </q-card-section>
          <q-card-section>
            <div style="width: 250px; height: 250px; margin: auto;">
              <canvas ref="periodoChart"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6">
        <q-card class="q-pa-lg text-center">
          <q-card-section>
            <div class="text-h5">Alunos por Modalidade</div>
          </q-card-section>
          <q-card-section>
            <div style="width: 250px; height: 250px; margin: auto;">
              <canvas ref="modalidadeChart"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useAlunosStore } from "src/stores/alunosStore";

const alunosStore = useAlunosStore();

const periodoChart = ref(null);
const modalidadeChart = ref(null);

function contarPorPeriodo(alunos) {
  const contagem = {};
  alunos.forEach((aluno) => {
    const periodo = aluno.plano.split(" - ")[1];
    contagem[periodo] = (contagem[periodo] || 0) + 1;
  });
  return contagem;
}

function contarPorModalidade(alunos) {
  const contagem = {};
  alunos.forEach((aluno) => {
    const modalidade = aluno.plano.split(" - ")[0];
    contagem[modalidade] = (contagem[modalidade] || 0) + 1;
  });
  return contagem;
}

onMounted(async () => {
  await alunosStore.fetchAlunosData();

  const alunos = alunosStore.alunos;

  const contagemPeriodos = contarPorPeriodo(alunos);
  const periodoLabels = Object.keys(contagemPeriodos);
  const periodoData = Object.values(contagemPeriodos);

  const contagemModalidades = contarPorModalidade(alunos);
  const modalidadeLabels = Object.keys(contagemModalidades);
  const modalidadeData = Object.values(contagemModalidades);

  new Chart(periodoChart.value.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: periodoLabels,
      datasets: [
        {
          data: periodoData,
          backgroundColor: ["#FFD700", "#FF4500", "#008000", "#0000FF"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });

  new Chart(modalidadeChart.value.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: modalidadeLabels,
      datasets: [
        {
          data: modalidadeData,
          backgroundColor: ["#FFD700", "#FF4500", "#008000", "#0000FF"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
});
</script>

<style scoped>
.q-pa-md {
  background-color: #d2d2d2;
}
</style>
