import { create } from 'zustand';

interface AppState {
    selectedThreat: string | null;
    setSelectedThreat: (id: string | null) => void;
    hoveredThreat: string | null;
    setHoveredThreat: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
    selectedThreat: null,
    setSelectedThreat: (id) => set({ selectedThreat: id }),
    hoveredThreat: null,
    setHoveredThreat: (id) => set({ hoveredThreat: id }),
}));
