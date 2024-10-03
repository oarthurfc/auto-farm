import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/auth`, { email, password });
    return response.data;
};

export const refresh = async () => {
    const response = await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
    return response.data;
};

export const logout = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`, // Adicionando o Bearer Token no cabeçalho
            },
        });
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error.response || error.message);
        throw error; // Opcional: relançar o erro para que o chamador possa lidar com ele
    }
};

