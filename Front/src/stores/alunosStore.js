import { defineStore } from "pinia";
import service from "src/services/alunosService";

export const useAlunosStore = defineStore("alunos", {
  state: () => ({
    alunos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAlunosData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await service.getAlunosData();
        this.alunos = data.alunos.slice(0, 5);
      } catch (err) {
        this.error = "Erro ao carregar alunos";
      } finally {
        this.loading = false;
      }
    },

    async getProfessorById(id) {
      this.loading = true;
      try {
        const data = await service.getAlunosData();
        return data.alunos.find((aluno) => aluno.id == id);
      } catch (err) {
        this.error = "Erro ao carregar dados do aluno";
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateProfessor(id, updatedData) {
      this.loading = true;
      try {
        await service.updateProfessor(id, updatedData);
        const index = this.alunos.findIndex((aluno) => aluno.id === id);
        if (index !== -1) {
          this.alunos[index] = {
            ...this.alunos[index],
            ...updatedData,
          };
        }
      } catch (err) {
        this.error = "Erro ao atualizar dados do aluno";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
