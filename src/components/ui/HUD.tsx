import { Paper, Typography, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShieldIcon from '@mui/icons-material/Shield';
import BugReportIcon from '@mui/icons-material/BugReport';
import WarningIcon from '@mui/icons-material/Warning';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { demoData } from '../../data/demo_data';
import { transformVulnerabilityData } from '../../utils/dataTransformer';
import { useStore } from '../../store';

const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Box sx={{ p: 1, borderRadius: 1, bgcolor: `${color}20`, color: color }}>
            {icon}
        </Box>
        <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" fontWeight="bold">{value}</Typography>
        </Box>
    </Paper>
);

export const HUD = () => {
    const theme = useTheme();
    // Split selectors to avoid object reference instability or use useShallow
    const toggleTheme = useStore((state) => state.toggleTheme);
    const themeMode = useStore((state) => state.themeMode);
    const logout = useStore((state) => state.logout);
    const user = useStore((state) => state.user);

    // Mock data for now
    const activeThreats = 12;
    const criticalAlerts = 3;
    const systemHealth = '98%';

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(5, 10, 20, 0.7)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${theme.palette.primary.main}`
            }}
        >
            <Box>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                    DEFSEC<span style={{ color: 'white' }}>GRID</span>
                </Typography>
                <Typography variant="caption" color="text.secondary">GLOBAL THREAT MONITORING</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error" sx={{ fontWeight: 'bold' }}>{criticalAlerts}</Typography>
                    <Typography variant="caption" color="text.secondary">CRITICAL</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>{activeThreats}</Typography>
                    <Typography variant="caption" color="text.secondary">ACTIVE</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>{systemHealth}</Typography>
                    <Typography variant="caption" color="text.secondary">HEALTH</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Model: <span style={{ color: theme.palette.success.main }}>ONLINE</span>
                </Typography>
                <Box sx={{ width: 1, height: 20, bgcolor: 'rgba(255,255,255,0.2)' }} />

                <Tooltip title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`}>
                    <IconButton onClick={toggleTheme} color="primary">
                        {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                    <IconButton onClick={logout} color="error">
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};
