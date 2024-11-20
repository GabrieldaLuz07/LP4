import { defineStore } from "pinia";
import service from "src/services/alunosService";

export const useAlunosStore = defineStore("alunos", {
  state: () => ({
    alunos: [],
    error: "",
  }),

  actions: {
    async fetchAlunosData() {
      try {
        const data = await service.getAlunosData();
        this.alunos = data.alunos.slice(0, 10);
      } catch (err) {
        this.error = "Erro ao carregar alunos";
      }
    },

    async getAlunoLogin(email, senha) {
      try {
        const data = await service.getAlunosData();
        const loginValido = data.alunos.find((aluno) => aluno.email == email && aluno.senha == senha);
        return loginValido != null ? true : false;
      } catch (err) {
        this.error = "Erro ao carregar dados do aluno";
      }
    },

    async getAlunoById(id) {
    try {
      const data = await service.getAlunosData();
      return data.alunos.find((prof) => prof.id == id);
    } catch (err) {
      this.error = "Erro ao carregar dados do aluno";
      return null;
    }
    },

    async addAluno(data) {
      try {
        await service.addAluno(data);
      } catch (err) {
        this.error = "Erro ao adicionar aluno";
        console.error(err);
      }
    },

    async updateAluno(id, updatedData) {
      try {
        await service.updateAluno(id, updatedData);
      } catch (err) {
        this.error = "Erro ao atualizar dados do aluno";
        console.error(err);
      }
    },

    async deleteAluno(id) {
      try {
        await service.deleteAluno(id);
      } catch {
        this.error = "Erro ao excluír aluno";
        console.error(err);
      }
    }
  },
});
