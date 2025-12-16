import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../store';
import { demoData } from '../../data/demo_data';

// Helper to convert lat/long to vector3
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
};

// Generate random coordinates for demo data since it doesn't have them
const enrichedData = demoData.map((item, i) => {
    // Deterministic random based on ID for stable positions
    const seed = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const lat = (seed % 160) - 80; // Avoid extreme poles
    const lon = ((seed * 13) % 360) - 180;
    return { ...item, lat, lon };
});

export const ThreatMap = () => {
    const theme = useTheme();
    const groupRef = useRef<THREE.Group>(null);
    const { selectedThreat, setSelectedThreat, hoveredThreat, setHoveredThreat } = useStore();

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y += 0.001;
        }
    });

    const globeRadius = 5;

    // Create arcs connecting threats (visual flair)
    const arcs = useMemo(() => {
        const points = [];
        for (let i = 0; i < 5; i++) {
            // Just some random connections for "network" effect
            const start = enrichedData[i % enrichedData.length];
            const end = enrichedData[(i + 3) % enrichedData.length];
            const startPos = latLongToVector3(start.lat, start.lon, globeRadius);
            const endPos = latLongToVector3(end.lat, end.lon, globeRadius);

            // Simple quadratic bezier curve for arc
            const midPos = startPos.clone().add(endPos).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.5);
            const curve = new THREE.QuadraticBezierCurve3(startPos, midPos, endPos);
            points.push(curve.getPoints(20));
        }
        return points;
    }, []);

    return (
        <group ref={groupRef}>
            {/* The Globe */}
            <Sphere args={[globeRadius, 64, 64]}>
                <meshPhongMaterial
                    color={theme.palette.mode === 'dark' ? '#001e3c' : '#e0f7fa'}
                    emissive={theme.palette.mode === 'dark' ? '#000a14' : '#ffffff'}
                    emissiveIntensity={0.1}
                    specular={new THREE.Color('#00F0FF')}
                    shininess={10}
                    wireframe={true} // High-tech grid look
                    transparent
                    opacity={0.3}
                />
            </Sphere>

            {/* Inner solid core to block view through functionality */}
            <Sphere args={[globeRadius * 0.99, 64, 64]}>
                <meshBasicMaterial color={theme.palette.background.default} />
            </Sphere>

            {/* Network Arcs */}
            {arcs.map((points, i) => (
                <Line
                    key={`arc-${i}`}
                    points={points}
                    color={theme.palette.primary.main}
                    opacity={0.3}
                    transparent
                    lineWidth={1}
                />
            ))}

            {/* Threat Nodes */}
            {enrichedData.map((item) => {
                const pos = latLongToVector3(item.lat, item.lon, globeRadius);
                const isSelected = selectedThreat === item.id;
                const isHovered = hoveredThreat === item.id;

                const color = item.severity === 'Critical' ? '#FF003C' :
                    item.severity === 'High' ? '#FFEA00' :
                        theme.palette.primary.main;

                return (
                    <group key={item.id} position={pos}>
                        <mesh
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedThreat(item.id);
                            }}
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                document.body.style.cursor = 'pointer';
                                setHoveredThreat(item.id);
                            }}
                            onPointerOut={(e) => {
                                document.body.style.cursor = 'auto';
                                setHoveredThreat(null);
                            }}
                        >
                            <sphereGeometry args={[isSelected ? 0.2 : 0.1, 16, 16]} />
                            <meshBasicMaterial
                                color={color}
                                toneMapped={false}
                            />
                        </mesh>

                        {/* Glow effect for selected/hovered */}
                        {(isSelected || isHovered) && (
                            <mesh>
                                <sphereGeometry args={[isSelected ? 0.4 : 0.2, 16, 16]} />
                                <meshBasicMaterial color={color} transparent opacity={0.3} />
                            </mesh>
                        )}

                        {/* Label on Hover/Select */}
                        {(isSelected || isHovered) && (
                            <Html distanceFactor={15}>
                                <div style={{
                                    background: 'rgba(0,0,0,0.8)',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    border: `1px solid ${color}`,
                                    color: 'white',
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none', // Allow clicking through
                                    fontFamily: 'Orbitron, sans-serif'
                                }}>
                                    {item.id} - {item.severity}
                                </div>
                            </Html>
                        )}
                    </group>
                );
            })}
        </group>
    );
};
