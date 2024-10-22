import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3500/despesa';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: BASE_URL,
});

// Adiciona um interceptor para incluir o Bearer Token
api.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken'); 
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Função para obter todas as despesas
export const getAllDespesas = () => {
    return api.get('/');
};

// Função para obter uma despesa por ID
export const getDespesaById = (id) => {
    return api.get(`/${id}`);
};

// Função para criar uma nova despesa
export const createDespesa = (despesaData) => {
    return api.post('/', despesaData);
};

// Função para atualizar uma despesa existente
export const updateDespesa = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar uma despesa
export const deleteDespesa = (id) => {
    return api.delete(`/${id}`);
};
