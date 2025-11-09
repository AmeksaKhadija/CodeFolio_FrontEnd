import axios from 'axios';
import { setToken, removeToken } from '../utils/token';

const API_URL = 'http://localhost:4000/graphql';

export const login = async (email, password) => {
    try {
        console.debug('Auth.login -> POST', `${API_URL}/auth/login`, { email });
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.debug('Auth.login response', response.status, response.data);
        const { token, user } = response.data;
        if (token) setToken(token);
        return response.data;
    } catch (error) {
        console.error('Auth.login error', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const logout = () => {
    removeToken();
};

export const isAuthenticated = () => !!localStorage.getItem('token');