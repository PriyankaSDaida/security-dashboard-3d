
import type { Vulnerability } from '../types';

// Flatten the nested JSON structure into our Vulnerability model
export const transformVulnerabilityData = (data: any): Vulnerability[] => {
    const list: Vulnerability[] = [];

    // Early return if data structure is invalid
    if (!data?.groups) return list;

    // Traverse: groups -> repos -> images -> versions -> vulnerabilities
    Object.values(data.groups).forEach((group: any) => {
        if (!group.repos) return;

        Object.values(group.repos).forEach((repo: any) => {
            if (!repo.images) return;

            Object.values(repo.images).forEach((image: any) => {
                if (!image.vulnerabilities) return;

                image.vulnerabilities.forEach((vuln: any) => {
                    const severity = capitalizeFirstLetter(vuln.severity || 'Low') as any;

                    // Generate mock analytics data for the dashboard demo
                    // In a real app, these would come from the API or an enrichment service
                    const exploitAvailable = Math.random() > 0.8;
                    const internetFacing = Math.random() > 0.7;
                    const assetCriticality = Math.random() > 0.5 ? 'Critical' : (Math.random() > 0.5 ? 'High' : 'Medium');

                    // Determine SLA status based on severity and date
                    const daysToFix = severity === 'Critical' ? 15 : (severity === 'High' ? 30 : 60);
                    const today = new Date();
                    const publishedDate = new Date(vuln.published || new Date().setDate(today.getDate() - Math.floor(Math.random() * 60)));
                    const dueDate = new Date(publishedDate);
                    dueDate.setDate(dueDate.getDate() + daysToFix);

                    const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
                    const slaStatus = daysOverdue > 0 ? 'Overdue' : (daysOverdue > -5 ? 'At Risk' : 'On Track');

                    // Randomly assign assessment statuses for testing filtering logic
                    const rand = Math.random();
                    const kaiStatus = rand > 0.8 ? 'invalid - norisk' : (rand > 0.6 ? 'ai-invalid-norisk' : 'open');

                    list.push({
                        id: vuln.cve || `unknown-${Math.random().toString(36).substr(2, 9)}`,
                        severity: severity,
                        description: vuln.description || 'No description available.',
                        status: vuln.status || 'Open',
                        assigned: vuln.owner || 'Unassigned',
                        coordinates: generateRandomSpherePoint(2.2), // Push nodes slightly off surface
                        exploitAvailable,
                        internetFacing,
                        assetCriticality,
                        slaStatus,
                        dueDate: dueDate.toLocaleDateString(),
                        lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        kaiStatus
                    });
                });
            });
        });
    });

    return list;
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Helper to distribute nodes on the 3D globe surface
const generateRandomSpherePoint = (radius: number): [number, number, number] => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
};
