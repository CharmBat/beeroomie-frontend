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
        if (response.data.error_status !== 0) {
            return response.data.system_message;
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};