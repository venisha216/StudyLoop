import api from "./api";

export const createStudySession = async (data) => {
  const res = await api.post("/study-session", data);
  return res.data;
};