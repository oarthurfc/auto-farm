import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/tarefa';

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

// Função para buscar todas as tarefas
export const getAll = () => {
    return api.get('/');
};

// Função para buscar uma tarefa por ID
export const getById = (id) => {
    return api.get(`/${id}`);
};

// Função para criar uma nova tarefa
export const create = (tarefaData) => {
    return api.post('/', tarefaData);
};

// Função para atualizar uma tarefa existente
export const update = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar uma tarefa
export const deletar = (id) => {
    return api.delete(`/${id}`);
};
