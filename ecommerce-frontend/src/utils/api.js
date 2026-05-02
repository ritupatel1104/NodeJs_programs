import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3005', // Your backend port [cite: 194, 203]
    withCredentials: true 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // Backend expects "Bearer <token>" 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;