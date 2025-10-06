import api from "./api";

// Vehicle Service - CRUD and contract history
export const fetchVehicles = async () => {
  const res = await api.get("/vehicles");
  return res.data;
};

export const fetchVehicleById = async (id) => {
  const res = await api.get(`/vehicles/${id}`);
  return res.data;
};

export const createVehicle = async (payload) => {
  const res = await api.post("/vehicles", payload);
  return res.data;
};

export const updateVehicle = async (id, payload) => {
  const res = await api.put(`/vehicles/${id}`, payload);
  return res.data;
};

export const deleteVehicle = async (id) => {
  await api.delete(`/vehicles/${id}`);
};

export const fetchVehicleContracts = async (id) => {
  const res = await api.get(`/vehicles/${id}/contracts`);
  return res.data;
};
