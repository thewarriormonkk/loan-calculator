import React, { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { type Theme, createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme preference from localStorage or use system preference
  const getInitialMode = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);

  // Create theme with enhanced colors for better dark mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode customizations
                primary: {
                  main: '#1976d2',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                // Dark mode customizations
                primary: {
                  main: '#90caf9',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#f1f1f1',
                  secondary: '#b0b0b0',
                },
              }),
        },
      }),
    [mode],
  );

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    // Update document body background color
    document.body.style.backgroundColor = mode === 'light' ? '#f5f5f5' : '#121212';
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
      <CssBaseline /> {/* This will apply global styles based on the theme */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};