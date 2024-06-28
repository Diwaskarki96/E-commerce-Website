import axios from "axios";

export const $axios = axios.create({
  baseURL: "https://e-commerce-website-s59h.onrender.com/",
  timeout: 5000,
});

//axios request interceptor
$axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
