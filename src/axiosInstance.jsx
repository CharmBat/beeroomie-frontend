// src/api/axiosInstance.js
import axios from 'axios';

// Create Axios Instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         console.error("API Error:", error.response || error.message);
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
