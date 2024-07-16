// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

// Add other methods like post, put, delete as needed
