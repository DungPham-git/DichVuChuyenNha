// src/service/vehicle.js
import api from "./api";

const VehicleAPI = {
  getAll: async () => {
    const res = await api.get("/vehicles");
    return res.data?.result ?? [];
  },

  getById: async (id) => {
    const res = await api.get(`/vehicles/${id}`);
    return res.data?.result;
  },

  create: async (payload) => {
    const res = await api.post("/vehicles", payload);
    return res.data?.result;
  },

  update: async (id, payload) => {
    const res = await api.put(`/vehicles/${id}`, payload);
    return res.data?.result;
  },

  remove: async (id) => {
    await api.delete(`/vehicles/${id}`);
  },

  history: async (id) => {
    const res = await api.get(`/vehicles/${id}/history`);
    return res.data?.result ?? [];
  },
};

export default VehicleAPI;


