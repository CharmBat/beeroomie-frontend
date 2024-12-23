// src/api/authEndpoints.js
import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const fetchAdvertisements = async () => {
    try {
        const response = await axiosInstance.get('/advertisement/');
        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching advertisements:", error);
        throw error; // Pass error up for handling
    }
};