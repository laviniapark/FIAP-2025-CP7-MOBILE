import axios from "axios";

const mapbox = axios.create({
    baseURL: "https://api.mapbox.com"
});

mapbox.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        access_token: process.env.EXPO_PUBLIC_MAPBOX_KEY,
        language: 'pt'
    };
    return config;
});

export default mapbox;