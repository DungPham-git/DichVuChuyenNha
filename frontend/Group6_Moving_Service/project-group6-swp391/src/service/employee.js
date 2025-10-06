import api from "./api";

// Employee Service - CRUD and history
export const fetchEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const fetchEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (payload) => {
  const res = await api.post("/employees", payload);
  return res.data;
};

export const updateEmployee = async (id, payload) => {
  const res = await api.put(`/employees/${id}`, payload);
  return res.data;
};

export const deleteEmployee = async (id) => {
  await api.delete(`/employees/${id}`);
};

export const fetchEmployeeHistory = async (id) => {
  const res = await api.get(`/employees/${id}/history`);
  return res.data;
};
