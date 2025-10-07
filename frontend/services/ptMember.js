import api from "../src/api";

export async function listPtMembers() {
  const { data } = await api.get("/ptMember");
  return data;
}

export async function createPtMember({ gymId, ptId, memberId, notes, status, lastContactedAt, nextActionAt }) {
  const { data } = await api.post("/ptMember", { gymId, ptId, memberId, notes, status, lastContactedAt, nextActionAt });
  return data;
}

export async function updatePtMember({ id, ...updates }) {
  const { data } = await api.put("/ptMember", { id, ...updates });
  return data;
}

export async function deletePtMember(id) {
  const { data } = await api.delete(`/ptMember?id=${encodeURIComponent(id)}`);
  return data;
}

export default {
  listPtMembers,
  createPtMember,
  updatePtMember,
  deletePtMember,
};


