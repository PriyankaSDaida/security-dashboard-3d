import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email);
            navigate('/');
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <Paper elevation={24} sx={{
                p: 5,
                width: '100%',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                textAlign: 'center'
            }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="primary" sx={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 'bold' }}>
                        DEFSEC<span style={{ color: 'white' }}>GRID</span>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 2 }}>
                        SECURE ACCESS
                    </Typography>
                </Box>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Email Address"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="password"
                        placeholder="Password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        endIcon={<LoginIcon />}
                        sx={{ mt: 2, height: 48 }}
                    >
                        Sign In
                    </Button>
                </form>

                <Typography variant="caption" color="text.secondary.dark">
                    Restricted Area. Authorized Personnel Only.
                </Typography>
            </Paper>
        </Box>
    );
};
