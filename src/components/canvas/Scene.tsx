import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Box, useTheme, CircularProgress } from '@mui/material';

interface SceneProps {
    children: React.ReactNode;
}

const Loader = () => {
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'primary.main',
            zIndex: 10
        }}>
            <CircularProgress color="inherit" />
        </Box>
    )
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Suspense fallback={<Loader />}>
                <Canvas
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <color attach="background" args={[theme.palette.background.default]} />

                    {/* Ambient Environment */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color={theme.palette.primary.main} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {children}

                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={3}
                        maxDistance={20}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </Suspense>
        </Box>
    );
};
