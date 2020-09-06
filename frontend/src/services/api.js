import axios from "axios";

const api = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + ':3001'
});

export default api;