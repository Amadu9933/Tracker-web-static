// src/App.tsx
import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { lightTheme } from './theme/muiTheme';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light text-text-primary-light">
      <MuiThemeProvider theme={lightTheme}>
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
