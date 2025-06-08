import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://73a95a8fb71c882b.mokky.dev',
});

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})