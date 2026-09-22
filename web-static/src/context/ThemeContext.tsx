import React, { createContext, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        localStorage.removeItem('trackerr-theme');
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode: false }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};