import { createTheme, type ThemeOptions } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: mode === 'dark' ? '#00F0FF' : '#0052cc', // Neon Cyan vs Corporate Blue
            light: mode === 'dark' ? '#69FFF8' : '#4c8dff',
            dark: mode === 'dark' ? '#00B8D4' : '#003d99',
            contrastText: mode === 'dark' ? '#000' : '#fff',
        },
        secondary: {
            main: mode === 'dark' ? '#7000FF' : '#6554C0', // Neon Purple vs Muted Purple
            light: '#B350FF',
            dark: '#4A00B3',
            contrastText: '#fff',
        },
        background: {
            default: mode === 'dark' ? '#020205' : '#f0f2f5', // Void vs Light Grey
            paper: mode === 'dark' ? 'rgba(5, 5, 10, 0.6)' : 'rgba(255, 255, 255, 0.8)',
        },
        text: {
            primary: mode === 'dark' ? '#ffffff' : '#172b4d',
            secondary: mode === 'dark' ? '#b3b3b3' : '#5e6c84',
        },
        error: {
            main: '#FF003C',
        },
        success: {
            main: '#39FF14',
        },
        warning: {
            main: '#FFEA00',
        },
    },
    typography: {
        fontFamily: mode === 'dark' ? '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif' : '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            textShadow: mode === 'dark' ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '0.05em',
        },
        button: {
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                },
                body: {
                    backgroundColor: mode === 'dark' ? '#020205' : '#f0f2f5',
                    backgroundImage: mode === 'dark' ? `
            radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 50%),
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          ` : 'none',
                    backgroundSize: '100% 100%, 40px 40px, 40px 40px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: mode === 'dark' ? '#00F0FF #020205' : '#0052cc #f0f2f5',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    border: mode === 'dark' ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: mode === 'dark' ? '0 0 15px rgba(0, 0, 0, 0.5)' : '0 1px 3px rgba(0,0,0,0.1)',
                    backgroundImage: mode === 'dark' ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' : 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: mode === 'dark' ? 0 : 4,
                    border: '1px solid transparent',
                    '&:hover': {
                        border: mode === 'dark' ? '1px solid #00F0FF' : '1px solid #0052cc',
                        boxShadow: mode === 'dark' ? '0 0 8px #00F0FF' : 'none',
                    }
                },
                containedPrimary: {
                    background: mode === 'dark' ? 'linear-gradient(90deg, #00B8D4 0%, #00F0FF 100%)' : '#0052cc',
                    color: '#fff',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: mode === 'dark' ? '1px solid rgba(0, 240, 255, 0.1)' : '1px solid rgba(0,0,0,0.1)',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: mode === 'dark' ? 'rgba(0, 240, 255, 0.1)' : '#f4f5f7',
                        borderBottom: mode === 'dark' ? '2px solid rgba(0, 240, 255, 0.3)' : '1px solid #dfe1e6',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: mode === 'dark' ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 82, 204, 0.04)',
                    },
                },
            },
        },
    },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
