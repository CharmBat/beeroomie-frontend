import axiosInstance from '../../axiosInstance';

export const sendLoginRequest = async (credentials) => {
    try {
        const payload = new URLSearchParams({
            grant_type: 'password',
            username: credentials.email,
            password: credentials.password,
            scope: '',
            client_id: 'string',
            client_secret: 'string'
        });
        const response = await axiosInstance.post('/auth/login', payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendRegisterRequest = async (credentials) => {
    try{
        const response = await axiosInstance.post('/auth/register', credentials);
        return response.data;
    }
    catch(error){
        throw error;
    }
};

export const sendForgotPasswordRequest = async (email) => {
    try {
        const response = await axiosInstance.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendConfirmEmailRequest = async (token) => {
    try {
        const response = await axiosInstance.get(`/auth/confirm/${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendResetPaswordRequest = async (token, password) => {
    try {
        const response = await axiosInstance.get(`/auth/change-password/${token}?new_password=${encodeURIComponent(password)}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
