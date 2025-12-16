import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    email: string;
    name: string;
}

interface StoreState {
    // Dashboard State
    selectedThreat: string | null;
    hoveredThreat: string | null;
    setSelectedThreat: (id: string | null) => void;
    setHoveredThreat: (id: string | null) => void;

    // Theme State
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;

    // Auth State
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            // Dashboard Defaults
            selectedThreat: null,
            hoveredThreat: null,
            setSelectedThreat: (id) => set({ selectedThreat: id }),
            setHoveredThreat: (id) => set({ hoveredThreat: id }),

            // Theme Defaults
            themeMode: 'dark',
            toggleTheme: () => set((state) => ({
                themeMode: state.themeMode === 'light' ? 'dark' : 'light'
            })),

            // Auth Defaults
            user: null,
            login: (email) => set({
                user: { email, name: email.split('@')[0] }
            }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'defsec-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({
                themeMode: state.themeMode,
                user: state.user
            }), // Only persist theme and user, not UI selection state
        }
    )
);
