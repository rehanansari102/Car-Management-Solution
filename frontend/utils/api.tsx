// utils/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in your .env.local file
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle errors globally
    console.error(error);
    if (error.response && error.response.status === 401) {
      // Redirect to login page if 401 Unauthorized
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export const get = async (url: string, params = {}) => {
  return api.get(url, { params });
};

export const post = async (url: string, data: any) => {
  return api.post(url, data);
};

export const put = async (url: string, data: any) => {
  return api.put(url, data);
};

export const del = async (url: string) => {
  return api.delete(url);
};
