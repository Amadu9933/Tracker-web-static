// src/App.tsx
import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme/muiTheme';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </MuiThemeProvider>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
