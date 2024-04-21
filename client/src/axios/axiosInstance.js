import axios from "axios";

export const $axios = axios.create({
  baseURL: "http://localhost:5555",
  timeout: 5000,
});
