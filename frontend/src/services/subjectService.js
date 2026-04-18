import api from "./api";

// GET subjects
export const getSubjects = async () => {
  const res = await api.get("/subjects");
  return res.data;
};

// CREATE subject
export const createSubject = async (name) => {
  const res = await api.post("/subjects", { name });
  return res.data;
};

// DELETE subject
export const deleteSubject = async (id) => {
  const res = await api.delete(`/subjects/${id}`);
  return res.data;
};

// UPDATE subject
export const updateSubject = async (id, name) => {
  const res = await api.put(`/subjects/${id}`, { name });
  return res.data;
};

export const getSubjectById = async (id) => {
  const res = await api.get(`/subjects/${id}`);
  return res.data;
};