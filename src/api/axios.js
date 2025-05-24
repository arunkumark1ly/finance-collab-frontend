// api/axios.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1', // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Optional: Set default headers
  },
});

// Optional: Add interceptors for requests or responses
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;