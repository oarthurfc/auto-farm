import axios from 'axios';
import Cookies from 'js-cookie'; // Não se esqueça de importar a biblioteca de cookies

const BASE_URL = 'https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/transacao';

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

// Utilizando a instância 'api' para as requisições
export const getAllTransacoes = () => {
    return api.get('/');
};

export const create = (transacaoData) => {
    return api.post('/', transacaoData);
};

export const deletarTransacao = (id) => {
    return api.delete(`/${id}`);
};

export const getById = (idTransacao) => {
    return api.get(`/${idTransacao}`);
};
