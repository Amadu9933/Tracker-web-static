import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <IconButton
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            sx={{
                color: isDarkMode ? '#FFFFFF' : '#000000',
                transition: 'color 150ms ease',
            }}
        >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default ThemeToggle;