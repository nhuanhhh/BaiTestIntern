import axios from "axios";

export const api = axios.create({
  baseURL: "https://baitestintern.onrender.com"
});

export default api;