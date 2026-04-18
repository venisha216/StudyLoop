import api from "./api";

// GET topics (all OR by subject)
export const getTopics = async (subjectId) => {
  const url = subjectId
    ? `/topics?subjectId=${subjectId}`
    : `/topics`;

  const res = await api.get(url);
  return res.data;
};

// CREATE
export const createTopic = async ({ name, subjectId }) => {
  const res = await api.post("/topics", { name, subjectId });
  return res.data;
};

// UPDATE
export const updateTopic = async (id, data) => {
  const res = await api.put(`/topics/${id}`, data);
  return res.data;
};

// DELETE
export const deleteTopic = async (id) => {
  const res = await api.delete(`/topics/${id}`);
  return res.data;
};