import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8386/api"
});

export default api;