import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../store';
import { demoData } from '../../data/demo_data';


// Helper to convert lat/long to vector3 (Deprecated: coordinates are now pre-calculated)
// const latLongToVector3 = ... 

import { transformVulnerabilityData } from '../../utils/dataTransformer';

// Transform data first
const allThreats = transformVulnerabilityData(demoData);

// Generate coords is now done in transformer, so we just use the data
// (Or if transformer adds them, we use them. If not, we map them here)
// Looking at new transformer, it ADDS coordinates! So we don't need to generate them here.

const enrichedData = allThreats;

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
        if (!enrichedData.length) return [];
        if (!enrichedData.length) return [];
        const points = [];
        for (let i = 0; i < 5; i++) {
            // Just some random connections for "network" effect
            const start = enrichedData[i % enrichedData.length];
            const end = enrichedData[(i + 3) % enrichedData.length];
            // Use coordinates directly
            const startPos = start.coordinates
                ? new THREE.Vector3(start.coordinates[0], start.coordinates[1], start.coordinates[2])
                : new THREE.Vector3(0, 0, 0);
            const endPos = end.coordinates
                ? new THREE.Vector3(end.coordinates[0], end.coordinates[1], end.coordinates[2])
                : new THREE.Vector3(0, 0, 0);

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
                // Use coordinates from transformer. It returns [x, y, z] directly!
                // Or if it returns [lat, lon, r], we convert.
                // The new transformer returns [x, y, z] tuple as `coordinates`.
                // But let's check the type definition in transformer again.
                // It says: coordinates: generateRandomSpherePoint(5) -> [x, y, z]

                // So we can use position directly if we have it.
                // But wait, ThreatMap logic below uses latLongToVector3. 
                // We should update it to use item.coordinates directly.

                const pos = item.coordinates
                    ? new THREE.Vector3(item.coordinates[0], item.coordinates[1], item.coordinates[2])
                    : new THREE.Vector3(0, 0, 0);

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
