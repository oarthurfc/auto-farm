import axios from "axios";

const BASE_URL = 'http://localhost:3500/register';

export const create = (userData) => {
    return axios.post(BASE_URL, userData)
};