import { createTheme, type ThemeOptions } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

const cyberpunkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#00F0FF', // Neon Cyan
            light: '#69FFF8',
            dark: '#00B8D4',
            contrastText: '#000',
        },
        secondary: {
            main: '#7000FF', // Neon Purple
            light: '#B350FF',
            dark: '#4A00B3',
            contrastText: '#fff',
        },
        background: {
            default: '#020205', // Deep Void
            paper: 'rgba(5, 5, 10, 0.6)', // Glassy
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
        error: {
            main: '#FF003C', // Cyber Red
        },
        success: {
            main: '#39FF14', // Neon Green
        },
        warning: {
            main: '#FFEA00', // Neon Yellow
        },
    },
    typography: {
        fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
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
                body: {
                    backgroundColor: '#020205',
                    backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 50%),
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '100% 100%, 40px 40px, 40px 40px', // Grid effect
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#00F0FF #020205',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Cyberpunk sharp edges
                    border: '1px solid transparent',
                    '&:hover': {
                        border: '1px solid #00F0FF',
                        boxShadow: '0 0 8px #00F0FF',
                    }
                },
                containedPrimary: {
                    background: 'linear-gradient(90deg, #00B8D4 0%, #00F0FF 100%)',
                    color: '#000',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(0, 240, 255, 0.1)',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                        borderBottom: '2px solid rgba(0, 240, 255, 0.3)',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 240, 255, 0.05)',
                    },
                },
            },
        },
    },
};

export const theme = createTheme(cyberpunkTheme);
