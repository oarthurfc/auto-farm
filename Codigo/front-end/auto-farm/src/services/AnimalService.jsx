import axios from 'axios';

const BASE_URL = 'http://localhost:3500/animal';

export const getAll = () => {
    return axios.get(BASE_URL);
};

export const getById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const create = (animalData) => {
    return axios.post(BASE_URL, animalData);
};

export const update = (id, updatedData) => {
    return axios.put(`${BASE_URL}/${id}`, updatedData);
};

export const deletar = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};
