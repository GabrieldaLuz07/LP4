import { defineStore } from "pinia";
import service from "src/services/professoresService";

export const useProfessoresStore = defineStore("professores", {
  state: () => ({
    professores: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProfessoresData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await service.getProfessoresData();
        this.professores = data.professores.slice(0, 5);
      } catch (err) {
        this.error = "Erro ao carregar professores";
      } finally {
        this.loading = false;
      }
    },

    async getProfessorById(id) {
      this.loading = true;
      try {
        const data = await service.getProfessoresData();
        return data.professores.find((prof) => prof.id_professor == id);
      } catch (err) {
        this.error = "Erro ao carregar dados do professor";
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateProfessor(id, updatedData) {
      this.loading = true;
      try {
        await service.updateProfessor(id, updatedData);
        const index = this.professores.findIndex(
          (prof) => prof.id_professor === id
        );
        if (index !== -1) {
          this.professores[index] = {
            ...this.professores[index],
            ...updatedData,
          };
        }
      } catch (err) {
        this.error = "Erro ao atualizar dados do professor";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
