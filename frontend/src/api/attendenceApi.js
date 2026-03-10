import api from "./axios";

export const markAttendanceApi = async (data) => {
  const res = await api.post("/attendance", data);
  return res.data;
};

export const getAttendance = async (employeeId) => {
  const res = await api.get(`/attendance/${employeeId}`);
  return res.data;
};
