import axios from "axios";

export const manufacturingApi = axios.create({
  baseURL: "http://localhost:3102/api",
});
