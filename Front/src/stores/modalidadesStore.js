import { defineStore } from "pinia";
import service from "src/services/modalidadesService";

export const useModalidadesStore = defineStore("modalidades", {
  state: () => ({
    modalidades: [],
    error: "",
  }),

  actions: {
    async fetchModalidadesData() {
      try {
        const data = await service.getModalidadesData();
        this.modalidades = data.modalidades.slice(0, 10);
      } catch (err) {
        this.error = "Erro ao carregar modalidades";
      }
    },

    async getModalidades() {
      const data = await service.getModalidadesData();
      return data.modalidades;
    },

    async getModalidadeById(id) {
      try {
        const data = await service.getModalidadesData();
        return data.modalidades.find((prof) => prof.id == id);
      } catch (err) {
        this.error = "Erro ao carregar dados do modalidade";
        return null;
      }
    },

    async addModalidade(data) {
      try {
        await service.addModalidade(data);
      } catch (err) {
        this.error = "Erro ao adicionar modalidade";
        console.error(err);
      }
    },

    async updateModalidade(id, updatedData) {
      try {
        await service.updateModalidade(id, updatedData);
      } catch (err) {
        this.error = "Erro ao atualizar dados do modalidade";
        console.error(err);
      }
    },

    async deleteModalidade(id) {
      try {
        await service.deleteModalidade(id);
      } catch {
        this.error = "Erro ao excluír modalidade";
        console.error(err);
      }
    }
  },
});
