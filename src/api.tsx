import axios from "axios";

const baseUrl = "http://localhost:4000";

export async function backserver() {
  const response = await axios.get(`${baseUrl}/videos/upload`);
  return response.data;
}

export async function searchServer(searchTitle: string) {
  const response = await axios.get(`${baseUrl}/search`, {
    params: { keyword: searchTitle },
  });
  return response.data;
}

export async function joinServer() {
  const response = await axios.get(`${baseUrl}/join`);
  return response.data;
}

export async function loginServer() {
  const response = await axios.get(`${baseUrl}/login`);
  return response.data;
}
