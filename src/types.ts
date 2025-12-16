export interface Vulnerability {
    id: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    status: string;
    assigned: string;
    coordinates?: [number, number, number]; // Optional 3D coordinates for the map
    exploitAvailable: boolean;
    internetFacing: boolean;
    assetCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
    slaStatus: 'On Track' | 'At Risk' | 'Overdue';
    dueDate: string;
    lastSynced: string;
    kaiStatus: 'open' | 'fixed' | 'invalid - norisk' | 'ai-invalid-norisk';
}
