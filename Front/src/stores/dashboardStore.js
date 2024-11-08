import { defineStore } from "pinia";
import service from "src/services/dashboardService";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    alunos: [],
    professores: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await service.getDashboardData();
        this.alunos = data.alunos.slice(0, 5);
        this.professores = data.professores.slice(0, 5);
      } catch (err) {
        this.error = "Erro ao carregar dados da Dashboard";
      } finally {
        this.loading = false;
      }
    },
  },
});
