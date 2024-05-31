import axios from "axios";

const baseUrl = "http://localhost:4000";

export async function backserver() {
  const response = await axios.get(`${baseUrl}/videos/upload`);
  return response.data;
}
