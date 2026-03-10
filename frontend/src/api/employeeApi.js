import api from "./axios";

export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployeeApi = async (data) => {
  const res = await api.post("/employees", data);
  return res.data;
};

export const deleteEmployeeApi = async (employeeId) => {
  const res = await api.delete(`/employees/${employeeId}`);
  return res.data;
};
