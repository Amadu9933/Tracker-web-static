// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

type User = {
    name: string;
    avatarUrl: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    // Fetch user data after token is set
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/user-profile', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    logout(); // Clear invalid token
                }
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            // Send login request
            const response = await axiosInstance.post('/login', { email, password });
            const { token } = response.data; // Assume backend returns a token

            // Save token to localStorage and state
            localStorage.setItem('token', token);
            setToken(token);

            // Fetch and store user data
            const userResponse = await axiosInstance.get('/user-profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userResponse.data);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
