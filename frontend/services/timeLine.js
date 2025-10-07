import api from "../src/api";

export async function listTimeLine() {
  const { data } = await api.get("/timeLine");
  return data;
}

export async function createTimeLine({ ptMemberId, type, body, createdBy }) {
  const { data } = await api.post("/timeLine", { ptMemberId, type, body, createdBy });
  return data;
}

export async function updateTimeLine({ id, ...updates }) {
  const { data } = await api.put("/timeLine", { id, ...updates });
  return data;
}

export async function deleteTimeLine(id) {
  const { data } = await api.delete(`/timeLine?id=${encodeURIComponent(id)}`);
  return data;
}

export default {
  listTimeLine,
  createTimeLine,
  updateTimeLine,
  deleteTimeLine,
};


