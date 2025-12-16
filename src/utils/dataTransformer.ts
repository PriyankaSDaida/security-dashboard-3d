import { demoData } from '../data/demo_data';

export const transformVulnerabilityData = (data: typeof demoData) => {
    // In a real app, this would flatten nested objects or format dates
    return data.map(item => ({
        ...item,
        // Add random lat/long for demo visualization purposes if needed
        // (Though ThreatMap handles this internally for now)
    }));
};
