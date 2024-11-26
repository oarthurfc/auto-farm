import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/animal';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: BASE_URL,
});

// Adiciona um interceptor para incluir o Bearer Token
api.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getAll = () => {
    return api.get('/'); // Usamos a instância api
};

export const getById = (id) => {
    return api.get(`/${id}`); // Usamos a instância api
};

export const create = (animalData) => {
    return api.post('/', animalData); // Usamos a instância api
};

export const update = (id, updatedData) => {
    return api.put(`/${id}`, updatedData); // Usamos a instância api
};

export const deletar = (id) => {
    return api.delete(`/${id}`); // Usamos a instância api
};
