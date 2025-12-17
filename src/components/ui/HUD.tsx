import { Paper, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';


import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';

import { useStore } from '../../store';



interface StatusMetricProps {
    value: string | number;
    label: string;
    color: 'error' | 'warning' | 'success';
}

const StatusMetric = ({ value, label, color }: StatusMetricProps) => (
    <Box sx={{ textAlign: 'center' }}>
        <Typography
            variant="h4"
            color={`${color}.main`}
            sx={{ fontWeight: 'bold' }}
        >
            {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
    </Box>
);

export const HUD = () => {
    const theme = useTheme();
    // Split selectors to avoid object reference instability or use useShallow
    const toggleTheme = useStore((state) => state.toggleTheme);
    const themeMode = useStore((state) => state.themeMode);
    const logout = useStore((state) => state.logout);

    // Mock data - ideally this would come from the store or props
    const metrics = {
        criticalAlerts: 3,
        activeThreats: 12,
        systemHealth: '98%'
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // Use theme-aware translucent background if possible, or keep specific look for HUD
                background: themeMode === 'dark' ? 'rgba(5, 10, 20, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderRadius: 0, // HUD typically spans full width
            }}
        >
            <Box>
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold', fontFamily: 'Orbitron' }}
                >
                    DEFSEC
                    <Box component="span" sx={{ color: 'text.primary' }}>GRID</Box>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    GLOBAL THREAT MONITORING
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <StatusMetric
                    value={metrics.criticalAlerts}
                    label="CRITICAL"
                    color="error"
                />
                <StatusMetric
                    value={metrics.activeThreats}
                    label="ACTIVE"
                    color="warning"
                />
                <StatusMetric
                    value={metrics.systemHealth}
                    label="HEALTH"
                    color="success"
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Model: <Box component="span" sx={{ color: 'success.main', fontWeight: 'bold' }}>ONLINE</Box>
                </Typography>

                <Box
                    sx={{
                        width: 1,
                        height: 20,
                        bgcolor: 'divider'
                    }}
                />

                <Tooltip title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`}>
                    <IconButton onClick={toggleTheme} color="primary" size="small">
                        {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                    <IconButton onClick={logout} color="error" size="small">
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};
