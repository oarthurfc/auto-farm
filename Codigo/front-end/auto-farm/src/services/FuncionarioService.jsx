import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3500/funcionario';

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

// Função para buscar todos os funcionários
export const getAll = () => {
    return api.get('/');
};

// Função para buscar um funcionário por ID
export const getById = (id) => {
    return api.get(`/${id}`);
};

// Função para criar um novo funcionário
export const create = (funcionarioData) => {
    return api.post('/', funcionarioData);
};

// Função para atualizar um funcionário existente
export const update = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar um funcionário
export const deletar = (id) => {
    return api.delete(`/${id}`);
};
