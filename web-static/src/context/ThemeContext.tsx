import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Check localStorage first
        const storedTheme = localStorage.getItem('trackerr-theme');
        if (storedTheme) {
            const isDark = storedTheme === 'dark';
            setIsDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        } else {
            // Fall back to OS preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            document.documentElement.classList.toggle('dark', prefersDark);
            localStorage.setItem('trackerr-theme', prefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDarkMode;
        setIsDarkMode(newIsDark);
        document.documentElement.classList.toggle('dark', newIsDark);
        localStorage.setItem('trackerr-theme', newIsDark ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
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