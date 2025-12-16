import { Box, Typography } from '@mui/material';
import { Scene } from '../components/canvas/Scene';
import { ThreatMap } from '../components/visuals/ThreatMap';

import { HUD } from '../components/ui/HUD';
import { VulnerabilityList } from '../components/ui/VulnerabilityList';

export const Dashboard = () => {
    return (
        <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{
                position: 'absolute',
                top: 40,
                left: 40,
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1 }}>DEFSEC<Box component="span" sx={{ color: 'primary.main' }}>GRID</Box></Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ letterSpacing: 2 }}>GLOBAL THREAT MONITORING</Typography>
            </Box>

            <HUD />

            {/* Side Panel for Vulnerabilities */}
            <Box sx={{
                position: 'absolute',
                top: 40,
                right: 40,
                bottom: 150, // Space for HUD
                width: '400px',
                zIndex: 10
            }}>
                <VulnerabilityList />
            </Box>

            {/* 3D Scene */}
            <Scene>
                <ThreatMap />
            </Scene>
        </Box>
    );
};
