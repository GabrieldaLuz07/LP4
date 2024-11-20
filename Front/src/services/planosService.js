import { api } from "../boot/axios";

export default {
  async getPlanosData() {
    try {
      const [planosResponse] = await Promise.all([api.get("/planos")]);

      return {
        planos: planosResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados dos planos:", error);
      throw error;
    }
  },

  async addPlano(data) {
    return await api.post("/planos", data);
  },

  async updatePlano(id, data) {
    return await api.put("/planos/" + id, data);
  },

  async deletePlano(id) {
    return await api.delete("/planos/" + id);
  }
};
