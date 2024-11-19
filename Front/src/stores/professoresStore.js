import { defineStore } from "pinia";
import service from "src/services/professoresService";

export const useProfessoresStore = defineStore("professores", {
  state: () => ({
    professores: [],
    error: ""
  }),

  actions: {
    async fetchProfessoresData() {
      try {
        const data = await service.getProfessoresData();
        this.professores = data.professores.slice(0, 10);
      } catch (err) {
        this.error = "Erro ao carregar professores";
      }
    },

    async getProfessorById(id) {
      try {
        const data = await service.getProfessoresData();
        return data.professores.find((prof) => prof.id == id);
      } catch (err) {
        this.error = "Erro ao carregar dados do professor";
        return null;
      }
    },

    async addProfessor(data) {
      try {
        await service.addProfessor(data);
      } catch (err) {
        this.error = "Erro ao adicionar professor";
        console.error(err);
      }
    },

    async updateProfessor(id, updatedData) {
      try {
        await service.updateProfessor(id, updatedData);
      } catch (err) {
        this.error = "Erro ao atualizar dados do professor";
        console.error(err);
      }
    },

    async deleteProfessor(id) {
      try {
        await service.deleteProfessor(id);
      } catch {
        this.error = "Erro ao excluír professor";
        console.error(err);
      }
    }
  },
});
