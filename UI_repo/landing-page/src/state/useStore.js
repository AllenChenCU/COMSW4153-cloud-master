import { create } from 'zustand';

const useStore = create((set) => ({
  loading: false, // Tracks loading state
  userInfo: null, // Holds user information
  routes: [], // Holds route data
  searchRoutes: [],
  searchHistory: [],
  savedRoutes: [],
  serviceStatuses: [],
  errorMessage: null, 
  currentPage: 1,
  from: null,
  to: null,
  
  // Actions to update the state
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (error) => set({ errorMessage: error }),
  setUserInfo: (user) => set({ userInfo: user }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
  setFrom: (from) => set({ from: from }),
  setTo: (to) => set({ to: to }),
  setServiceStatuses: (newStatuses) => set({ serviceStatuses: newStatuses }),
  deleteSavedRoute: (route_id) => set((state) => ({
    savedRoutes: {
      ...state.savedRoutes, // Keep other parts of savedRoutes intact
      saved_routes: state.savedRoutes.saved_routes.filter(route => route.route_id !== route_id) // Remove the route with matching route_id
    }
  })),
  
  addSavedRoute: (route) => set((state) => ({
    savedRoutes: [...state.savedRoutes, route]
  })),  
  setSavedRoutes: (newRoutes) => set({ savedRoutes: newRoutes }),
  setSearchRoutes: (newRoutes) => set({ searchRoutes: newRoutes }),
  setSearchHistory: (newHistory) => set({ searchHistory: newHistory }),
  clearState: () => set({ loading: false, userInfo: null, routes: [] }) // Resets state
}));

export default useStore;
