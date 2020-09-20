import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + ':3001'
    //baseURL: 'https://crud-nodejs-mongo-db.herokuapp.com' //API Production
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;