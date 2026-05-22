"use client";

import axios from "axios";
 //  http://localhost:5002/api https://simple-sass-product.onrender.com/api 
const api = axios.create({
  baseURL: "http://localhost:5002/api",
});


api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;