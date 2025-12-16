import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../store';

const ThreatNode = ({ position, label, id }: { position: [number, number, number], label: string, id: string }) => {
    const theme = useTheme();
    const ref = useRef<THREE.Mesh>(null);
    const { selectedThreat, setSelectedThreat, setHoveredThreat } = useStore();
    const isSelected = selectedThreat === id;

    // Local hover state for visual feedback
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (ref.current) {
            // Pulse effect enhanced when selected
            const scaleBase = isSelected ? 1.5 : 1;
            ref.current.scale.setScalar(scaleBase + Math.sin(state.clock.elapsedTime * (isSelected ? 4 : 2)) * 0.2);
        }
    });

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHover(true);
        setHoveredThreat(id);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHover(false);
        setHoveredThreat(null);
        document.body.style.cursor = 'auto';
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setSelectedThreat(isSelected ? null : id);
    };

    return (
        <group position={position}>
            <mesh
                ref={ref}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color={isSelected ? theme.palette.secondary.main : (hovered ? '#fff' : theme.palette.error.main)}
                    emissive={isSelected ? theme.palette.secondary.main : theme.palette.error.main}
                    emissiveIntensity={isSelected ? 4 : 2}
                    toneMapped={false}
                />
            </mesh>
            {(hovered || isSelected) && (
                <Html distanceFactor={10}>
                    <div style={{
                        color: isSelected ? theme.palette.secondary.main : theme.palette.error.main,
                        fontSize: '14px',
                        fontFamily: 'Orbitron',
                        whiteSpace: 'nowrap',
                        textShadow: '0 0 5px black',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid ' + (isSelected ? theme.palette.secondary.main : theme.palette.error.main)
                    }}>
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
};

import { demoData } from '../../data/demo_data';
import { transformVulnerabilityData } from '../../utils/dataTransformer';

export const ThreatMap = () => {
    const theme = useTheme();
    const globeRef = useRef<THREE.Mesh>(null);
    const vulnerabilities = transformVulnerabilityData(demoData);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group>
            {/* Main Globe */}
            <Sphere ref={globeRef} args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color={theme.palette.primary.dark}
                    wireframe
                    distort={0.4}
                    speed={2}
                    roughness={0}
                />
            </Sphere>

            {/* Core Glow */}
            <pointLight position={[0, 0, 0]} intensity={2} color={theme.palette.secondary.main} distance={5} />

            {/* Dynamic Threat Nodes */}
            {vulnerabilities.map((vuln) => (
                <ThreatNode
                    key={vuln.id}
                    position={vuln.coordinates || [1, 0, 0]}
                    label={`${vuln.id} (${vuln.severity})`}
                    id={vuln.id}
                />
            ))}
        </group>
    );
};
