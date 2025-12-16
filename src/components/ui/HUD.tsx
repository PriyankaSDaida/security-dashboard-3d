import { Paper, Typography, Box, Grid } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import BugReportIcon from '@mui/icons-material/BugReport';
import WarningIcon from '@mui/icons-material/Warning';

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
    return (
        <Box sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '1000px',
            zIndex: 10,
            pointerEvents: 'none' // Clicks pass through
        }}>
            <Grid container spacing={2} sx={{ pointerEvents: 'auto' }}> {/* Restore input for cards */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        icon={<ShieldIcon />}
                        title="System Status"
                        value="98.5%"
                        color="#39FF14"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        icon={<BugReportIcon />}
                        title="Active Threats"
                        value="12"
                        color="#FF003C"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        icon={<WarningIcon />}
                        title="Risks Mitigated"
                        value="450"
                        color="#00F0FF"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
