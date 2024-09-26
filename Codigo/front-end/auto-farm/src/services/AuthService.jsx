import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export const login = async (email, password) => {
    return await axios.post(`${BASE_URL}/auth`, { email, password });
};

export const refresh = async () => {
    return await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
};

export const logout = async () => {
    return await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
};
