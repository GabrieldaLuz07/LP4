import { defineStore } from "pinia";
import service from "src/services/modalidadesService";

export const useModalidadesStore = defineStore("modalidades", {
  state: () => ({
    modalidades: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchModalidadesData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await service.getModalidadesData();
        this.modalidades = data.modalidades.slice(0, 5);
      } catch (err) {
        this.error = "Erro ao carregar modalidades";
      } finally {
        this.loading = false;
      }
    },

    async getProfessorById(id) {
      this.loading = true;
      try {
        const data = await service.getModalidadesData();
        return data.modalidades.find((modal) => modal.id == id);
      } catch (err) {
        this.error = "Erro ao carregar dados da modalidade";
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateProfessor(id, updatedData) {
      this.loading = true;
      try {
        await service.updateProfessor(id, updatedData);
        const index = this.modalidades.findIndex(
          (modal) => modal.id === id
        );
        if (index !== -1) {
          this.modalidades[index] = {
            ...this.modalidades[index],
            ...updatedData,
          };
        }
      } catch (err) {
        this.error = "Erro ao atualizar dados da modalidade";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
