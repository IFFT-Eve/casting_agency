import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

// Add a request interceptor
axiosClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

// Add a response interceptor
axiosClient.interceptors.response.use((response) => {
  return response;
});
