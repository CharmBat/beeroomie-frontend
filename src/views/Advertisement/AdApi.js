import axiosInstance from '../../axiosInstance';

export const getAllAdvertisements = async (currentPage) => {
    try {
        const response = await axiosInstance.get(`/advertisement?pagination=${currentPage-1}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const filterAdvertisements = async (filterValues, currentPage) => {
    try {
        const query = new URLSearchParams(
            Object.fromEntries(Object.entries(filterValues).filter(([_, value]) => value !== undefined))
        ).toString();
        const response = await axiosInstance.get(`/advertisement/?pagination=${currentPage-1}&${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};