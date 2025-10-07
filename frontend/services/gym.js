import api from "../src/api";

export async function listGyms() {
  const { data } = await api.get("/gym");
  return data;
}

export async function createGym({ name, brand_theme_json = null }) {
  const { data } = await api.post("/gym", { name, brand_theme_json });
  return data;
}

export async function updateGym({ id, ...updates }) {
  const { data } = await api.put("/gym", { id, ...updates });
  return data;
}

export async function deleteGym(id) {
  const { data } = await api.delete(`/gym?id=${encodeURIComponent(id)}`);
  return data;
}

export default {
  listGyms,
  createGym,
  updateGym,
  deleteGym,
};


