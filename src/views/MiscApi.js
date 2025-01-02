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