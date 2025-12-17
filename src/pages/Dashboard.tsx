import { Box } from '@mui/material';

import { Scene } from '../components/canvas/Scene';
import { ThreatMap } from '../components/canvas/ThreatMap';
import { HUD } from '../components/ui/HUD';
import { VulnerabilityList } from '../components/ui/VulnerabilityList';
import { VulnerabilityDetail } from '../components/ui/VulnerabilityDetail';

export const Dashboard = () => {
    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'background.default',
            animation: 'fadeIn 1s ease-out'
        }}>
            {/* 3D Background */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }}>
                <Scene>
                    <ThreatMap />
                </Scene>
            </Box>

            {/* UI Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none', // Allow clicks to pass through to 3D scene where empty
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* HUD Header */}
                <Box sx={{ p: 2, pointerEvents: 'auto' }}>
                    <HUD />
                </Box>

                {/* Main Content Area */}
                <Box sx={{ flex: 1, display: 'flex', p: 2, gap: 2, overflow: 'hidden' }}>

                    {/* Left Panel: Vulnerability List */}
                    <Box sx={{
                        width: '450px',
                        height: '100%',
                        pointerEvents: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <VulnerabilityList />
                    </Box>

                    {/* Right Panel: Empty for now (or 3D view interaction space) */}
                    <Box sx={{ flex: 1 }} />
                </Box>
            </Box>

            {/* Detail Drawer (Z-Index handles overlay) */}
            <VulnerabilityDetail />
        </Box>
    );
};
