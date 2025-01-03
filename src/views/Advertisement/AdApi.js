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

export const uploadPhoto = async (file) => {
    try{
    const response = await axiosInstance.post('/upload-image/', {
        method: 'POST',
        body: file.originFileObj,
      });
      const data = await response.json();
      return data;
    }
    catch(error){
        throw error;
    }
};

export const getUtilities = async () => {
    try {
        const response = await axiosInstance.get('/advertisement/utility');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAdById = async (id) => {
    try {
        const response = await axiosInstance.get(`/advertisement/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDistricts = async () => {
    try{
        const response = await axiosInstance.get('/advertisement/district');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getNeighborhoods = async (districtId) => {
    try{
        const response = await axiosInstance.get(`/advertisement/neighborhood/${districtId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getN_rooms = async () => {
    try{
        const response = await axiosInstance.get('/advertisement/rooms');
        return response.data;
    } catch (error) {
        throw error;
    }
};