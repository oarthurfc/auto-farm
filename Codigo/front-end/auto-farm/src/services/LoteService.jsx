import axios from 'axios';
import Cookies from 'js-cookie'; 

const BASE_URL = "https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/lote"; 


const api = axios.create({
    baseURL: BASE_URL,
});


api.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export const criarLote = (loteData) => {
    return api.post('', loteData); 
};


export const atualizarLote = (id, loteData) => {
    return api.put(`/${id}`, loteData); 
};

export const getAllLotes = () => {
    return api.get(''); 
};

export const deletar = (id) => {
    return axios.delete(`/api/lotes/${id}`);
};
