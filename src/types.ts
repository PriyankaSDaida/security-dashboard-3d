export interface Vulnerability {
    id: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    status: string;
    assigned: string;
    currentVersion?: string; // Add these as optional if they are used
    fixedVersion?: string;
    package?: string;
    coordinates?: [number, number, number];
    exploitAvailable: boolean;
    internetFacing: boolean;
    assetCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
    slaStatus: 'On Track' | 'At Risk' | 'Overdue';
    dueDate: string;
    lastSynced: string;
    kaiStatus: 'open' | 'fixed' | 'invalid - norisk' | 'ai-invalid-norisk';
}
