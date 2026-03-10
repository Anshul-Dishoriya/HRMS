import api from "./axios";

export const getAttendanceSummary = async (date) => {
    const res = await api.get(`/analytics/attendance-summary?date=${date}`);
    return res.data;
};
