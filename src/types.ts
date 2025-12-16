export interface Vulnerability {
    id: string;
    description: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    cvssScore: number;
    affectedAsset: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    timestamp: string;
    coordinates?: [number, number]; // Lat, Long for 3D map
}
