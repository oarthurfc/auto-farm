import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3500/pasto';

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

// Função para buscar todos os pastos
export const getAll = () => {
    return api.get('/');
};

// Função para buscar um pasto por ID
export const getById = (id) => {
    return api.get(`/${id}`);
};

// Função para registrar um novo uso de pasto
export const create = (usoData) => {
    return api.post('/', usoData);
};

// Função para atualizar um uso existente
export const update = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar um uso
export const deletar = (id) => {
    return api.delete(`/${id}`);
};
