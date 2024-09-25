import axios from 'axios';

const BASE_URL = 'http://localhost:3500/historico'; // Altere a URL base conforme necessário

export const getAll = () => {
    return axios.get(BASE_URL);
};

export const getById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const create = (historicoData) => {
    return axios.post(BASE_URL, historicoData);
};

export const update = (id, updatedData) => {
    return axios.put(`${BASE_URL}/${id}`, updatedData);
};

export const deletar = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};
