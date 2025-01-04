import axiosInstance from '../axiosInstance';

export const photoUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post('/upload-image/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.photoUrl;
    } catch (error) {
        console.error("Fotoğraf Yüklenemedi:", error);
        throw error;
    }
};

export const getReportedUsers = async () => {
    try {
        const response = await axiosInstance.get('/administration/report');
        return response.data.report_list;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const banUser = async (userId) => {
    try {
        const response = await axiosInstance.post(`/administration/ban/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const deleteReport = async (reportId) => {
    try {
        const response = await axiosInstance.delete(`/administration/report/${reportId}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const reportUser = async (report) => {
    try {
        const response = await axiosInstance.post(`/administration/report`,report);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const getFavorites = async () => {
    try {
        const response = await axiosInstance.get('/favorites');
        return response.data.advertisement_list;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const getFavoriteIds = async () => {
    try {
        const response = await axiosInstance.get('/favorites');
        return response.data.advertisement_list.map(ad => ad.adpageid);
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const addFavorite = async (adId) => {
    try {
        const response = await axiosInstance.post(`/favorites?adpage_id=${adId}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}

export const removeFavorite = async (adId) => {
    try {
        const response = await axiosInstance.delete(`/favorites?adpage_id=${adId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
}