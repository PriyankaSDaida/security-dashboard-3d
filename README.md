# Security Dashboard 3D

Experimental SOC dashboard built with React 19 and Three.js. It visualizes vulnerability data in 3D to help analysts spot critical threats faster.

![Preview](public/dashboard_preview.png)

## Features

- **3D Threat Map**: Visualizes vulnerabilities as nodes on a globe.
- **Priority Filtering**: Quick toggle for "Perfect Storm" items (High/Crit + Internet + Expoitable).
- **Assessment Logic**: Custom filters to weed out 'invalid' or 'norisk' kaiStatus statuses.
- **SLA Tracking**: Visual cues for overdue items.

## Setup

Standard Vite + React setup.

```bash
# Install
npm install

# Dev
npm run dev
```

## Dataset

Currently using a static sample in `src/data/demo_data.ts` to keep the repo light.
The `dataTransformer` utility handles the flattening and 3D coordinate generation.

## License

MIT
