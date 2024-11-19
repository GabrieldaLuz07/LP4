import { api } from "../boot/axios";

export default {
  async getProfessoresData() {
    try {
      const [professoresResponse] = await Promise.all([
        api.get("/professores"),
      ]);

      return {
        professores: professoresResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados dos professores:", error);
      throw error;
    }
  },

  async getProfessorById(id) {
    const response = await api.get("/professores");
    return response.data;
  },

  async addProfessor(data) {
    return await api.post("/professores", data);
  },

  async updateProfessor(id, data) {
    return await api.put("/professores/" + id, data);
  },

  async deleteProfessor(id) {
    return await api.delete("/professores/" + id);
  }
};
