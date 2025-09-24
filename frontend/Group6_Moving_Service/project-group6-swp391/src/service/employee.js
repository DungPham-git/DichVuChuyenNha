// src/service/employee.js
import api from "./api";

const EmployeeAPI = {
  getAll: async () => {
    const res = await api.get("/employees");
    return res.data?.result ?? [];
  },

  getById: async (id) => {
    const res = await api.get(`/employees/${id}`);
    return res.data?.result;
  },

  create: async (payload) => {
    const res = await api.post("/employees", payload);
    return res.data?.result;
  },

  update: async (id, payload) => {
    const res = await api.put(`/employees/${id}`, payload);
    return res.data?.result;
  },

  remove: async (id) => {
    await api.delete(`/employees/${id}`);
  },

  history: async (id) => {
    const res = await api.get(`/employees/${id}/history`);
    return res.data?.result ?? [];
  },
};

export default EmployeeAPI;


