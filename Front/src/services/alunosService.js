import { api } from "../boot/axios";

export default {
  async getAlunosData() {
    try {
      const [alunosResponse] = await Promise.all([api.get("/alunos")]);

      return {
        alunos: alunosResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados dos alunos:", error);
      throw error;
    }
  },

  async addAluno(data) {
    return await api.post("/alunos", data);
  },

  async updateAluno(id, data) {
    return await api.put("/alunos/" + id, data);
  },

  async deleteAluno(id) {
    return await api.delete("/alunos/" + id);
  }
};
