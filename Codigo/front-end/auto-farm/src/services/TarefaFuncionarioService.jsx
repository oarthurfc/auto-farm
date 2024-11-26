import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/tarefaFuncionario';

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

// Função para buscar todas as relações Tarefa-Funcionario
export const getAll = () => {
    return api.get('/');
};

// Função para buscar uma relação Tarefa-Funcionario por ID
export const getById = (id) => {
    return api.get(`/${id}`);
};

// Função para criar uma nova relação Tarefa-Funcionario
export const create = (tarefaFuncionarioData) => {
    return api.post('/', tarefaFuncionarioData);
};

// Função para atualizar uma relação Tarefa-Funcionario existente
export const update = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar uma relação Tarefa-Funcionario
export const deletar = (id) => {
    return api.delete(`/${id}`);
};
