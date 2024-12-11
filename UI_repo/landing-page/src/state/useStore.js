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
  deleteSavedRoute: (routeId) => set((state) => ({ savedRoutes: state.savedRoutes.filter((route) => route.id !== routeId) })),
  addSavedRoute: (route) => set((state) => ({ savedRoutes: [...state.savedRoutes, route] })),
  setSavedRoutes: (newRoutes) => set({ savedRoutes: newRoutes }),
  setSearchRoutes: (newRoutes) => set({ searchRoutes: newRoutes }),
  setSearchHistory: (newHistory) => set({ searchHistory: newHistory }),
  clearState: () => set({ loading: false, userInfo: null, routes: [] }) // Resets state
}));

export default useStore;
