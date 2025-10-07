import api from "../src/api";

export async function listMembers() {
  const { data } = await api.get("/member");
  return data;
}

export async function createMember({ gymId, fullName, email, phone, joinDate, isActive }) {
  const { data } = await api.post("/member", { gymId, fullName, email, phone, joinDate, isActive });
  return data;
}

export async function updateMember({ id, ...updates }) {
  const { data } = await api.put("/member", { id, ...updates });
  return data;
}

export async function deleteMember(id) {
  const { data } = await api.delete(`/member?id=${encodeURIComponent(id)}`);
  return data;
}

export default {
  listMembers,
  createMember,
  updateMember,
  deleteMember,
};


