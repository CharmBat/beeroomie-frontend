import axiosInstance from '../../axiosInstance';

export const getUserProfile = async (userId) => {
    try {
        const response = await axiosInstance.get(`/userpageinfo/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createUserProfile = async (userData) => {
    try {
        const response = await axiosInstance.post('/userpageinfo/', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await axiosInstance.put(`/userpageinfo?userid=${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
