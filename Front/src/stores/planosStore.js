import { defineStore } from "pinia";
import service from "src/services/planosService";

export const usePlanosStore = defineStore("planos", {
  state: () => ({
    planos: [],
    error: ""
  }),

  actions: {
    async fetchPlanosData() {
      try {
        const data = await service.getPlanosData();
        this.planos = data.planos.slice(0, 10);
      } catch (err) {
        this.error = "Erro ao carregar planos";
      }
    },

    async getPlanos() {
      const data = await service.getPlanosData();
      return data.planos;
    },

    async getPlanoById(id) {
      try {
        const data = await service.getPlanosData();
        return data.planos.find((prof) => prof.id == id);
      } catch (err) {
        this.error = "Erro ao carregar dados do plano";
        return null;
      }
    },

    async addPlano(data) {
      try {
        await service.addPlano(data);
      } catch (err) {
        this.error = "Erro ao adicionar plano";
        console.error(err);
      }
    },

    async updatePlano(id, updatedData) {
      try {
        await service.updatePlano(id, updatedData);
      } catch (err) {
        this.error = "Erro ao atualizar dados do plano";
        console.error(err);
      }
    },

    async deletePlano(id) {
      try {
        await service.deletePlano(id);
      } catch {
        this.error = "Erro ao excluír plano";
        console.error(err);
      }
    }
  },
});
