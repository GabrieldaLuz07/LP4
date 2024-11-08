import { api } from "../boot/axios";

export default {
  async getModalidadesData() {
    try {
      const [modalidadesResponse] = await Promise.all([
        api.get("/modalidades"),
      ]);

      return {
        modalidades: modalidadesResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados dos modalidades:", error);
      throw error;
    }
  },

  async getModalidadeById(id) {
    const response = await api.get("/modalidades");
    return response.data;
  },

  async updateModalidade(id, data) {
    return await api.put(`/modalidades/${id}`, data);
  },
};
