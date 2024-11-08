import { api } from "src/boot/axios";

export default {
  async getDashboardData() {
    try {
      const [alunosResponse, professoresResponse] = await Promise.all([
        api.get("/alunos"),
        api.get("/professores"),
      ]);

      return {
        alunos: alunosResponse.data,
        professores: professoresResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados da Dashboard:", error);
      throw error;
    }
  },
};
