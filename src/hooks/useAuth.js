import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getToken, setToken } from '../utils/token';
import { logout as logoutService } from '../services/auth';
import client from '../apollo/client';
import { LOGIN_MUTATION } from '../api/mutations';

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            console.debug('Existing token:', token);
        }
        setLoading(false);
    }, [setUser]);

    const login = async (email, password, username) => {
        setLoading(true);
        setError(null);
        try {
            const result = await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: { username, email, password },
            });
            console.debug('login result:', result);
            const payload = result?.data?.login;
            if (!payload || !payload.token) {
                const msg = result?.errors?.[0]?.message || 'No token returned';
                throw new Error(msg);
            }
            setToken(payload.token);
            // forcer Apollo à utiliser le token fraîchement stocké pour les requêtes suivantes
            await client.resetStore();
            setUser(payload.user || null);
            return payload;
        } catch (err) {
            console.error('useAuth.login error', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const isAuthenticated = !!getToken();

    return { user, setUser, login, logout, loading, error, isAuthenticated };
};

export default useAuth;