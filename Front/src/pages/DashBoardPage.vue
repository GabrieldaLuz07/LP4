<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Gráfico de Planos -->
      <div class="col-6">
        <q-card class="q-pa-lg text-center">
          <q-card-section>
            <div class="text-h5">Planos</div>
          </q-card-section>
          <q-card-section>
            <!-- Definindo um contêiner de tamanho fixo para o gráfico -->
            <div style="width: 250px; height: 250px; margin: auto;">
              <canvas ref="planosChart"></canvas>
            </div>
            <div class="text-left q-mt-md">
              <ul>
                <li>Plano anual - 38.11%</li>
                <li>Plano semestral - 30.50%</li>
                <li>Plano mensal - 21.16%</li>
                <li>Plano trimestral - 10.18%</li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Gráfico de Esporte -->
      <div class="col-6">
        <q-card class="q-pa-lg text-center">
          <q-card-section>
            <div class="text-h5">Esporte</div>
          </q-card-section>
          <q-card-section>
            <!-- Definindo um contêiner de tamanho fixo para o gráfico -->
            <div style="width: 250px; height: 250px; margin: auto;">
              <canvas ref="esporteChart"></canvas>
            </div>
            <div class="text-left q-mt-md">
              <ul>
                <li>Academia - 38.11%</li>
                <li>Dança - 30.50%</li>
                <li>Funcional - 21.16%</li>
                <li>Natação - 10.18%</li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const planoData = {
  labels: ['Plano anual', 'Plano semestral', 'Plano mensal', 'Plano trimestral'],
  datasets: [
    {
      data: [38.11, 30.50, 21.16, 10.18],
      backgroundColor: ['#FFD700', '#FF4500', '#008000', '#0000FF'],
    },
  ],
};

const esporteData = {
  labels: ['Academia', 'Dança', 'Funcional', 'Natação'],
  datasets: [
    {
      data: [38.11, 30.50, 21.16, 10.18],
      backgroundColor: ['#FFD700', '#FF4500', '#008000', '#0000FF'],
    },
  ],
};

const planosChart = ref(null);
const esporteChart = ref(null);

onMounted(() => {
  // Inicialização do gráfico de Planos
  new Chart(planosChart.value.getContext('2d'), {
    type: 'doughnut',
    data: planoData,
    options: {
      responsive: true,
      maintainAspectRatio: true, // Impede o gráfico de se redimensionar indefinidamente
    },
  });

  // Inicialização do gráfico de Esporte
  new Chart(esporteChart.value.getContext('2d'), {
    type: 'doughnut',
    data: esporteData,
    options: {
      responsive: true,
      maintainAspectRatio: true, // Impede o gráfico de se redimensionar indefinidamente
    },
  });
});
</script>

<style scoped>
.q-pa-md {
  background-color: #2e2e2e;
  color: #ffffff;
}
ul {
  list-style: none;
  padding: 0;
  color: #ffffff;
}
</style>
