// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const initialState = {
//   loading: false, // Tracks loading state
//   userInfo: null, // Holds user information
//   routes: [], // Holds route data
//   searchRoutes: [],
//   searchHistory: [],
//   savedRoutes: [],
//   serviceStatuses: [],
//   errorMessage: null, 
//   currentPage: 1,
//   from: null,
//   to: null,
  
// }
// const useStore = create((set) => ({
//   ...initialState,
  
//   // Actions to update the state
//   setLoading: (isLoading) => set({ loading: isLoading }),
//   setError: (error) => set({ errorMessage: error }),
//   setUserInfo: (user) => set({ userInfo: user }),
//   setRoutes: (newRoutes) => set({ routes: newRoutes }),
//   setCurrentPage: (newPage) => set({ currentPage: newPage }),
//   setFrom: (from) => set({ from: from }),
//   setTo: (to) => set({ to: to }),
//   setServiceStatuses: (newStatuses) => set({ serviceStatuses: newStatuses }),
//   deleteSavedRoute: (route_id) => set((state) => ({
//     savedRoutes: {
//       ...state.savedRoutes, // Keep other parts of savedRoutes intact
//       saved_routes: state.savedRoutes.saved_routes.filter(route => route.route_id !== route_id) // Remove the route with matching route_id
//     }
//   })),
  
//   addSavedRoute: (route) => set((state) => ({
//     savedRoutes: [...state.savedRoutes, route]
//   })),  
//   setSavedRoutes: (newRoutes) => set({ savedRoutes: newRoutes }),
//   setSearchRoutes: (newRoutes) => set({ searchRoutes: newRoutes }),
//   setSearchHistory: (newHistory) => set({ searchHistory: newHistory }),
//   clearState: () => set(initialState) // Resets state
// }));

// export default useStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js'; 

const initialState = {
  loading: false,
  userInfo: null,
  routes: [],
  searchRoutes: [],
  searchHistory: [],
  savedRoutes: [],
  serviceStatuses: [],
  errorMessage: null,
  currentPage: 1,
  from: null,
  to: null,
};

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

const useStore = create(persist(
  (set) => ({
    ...initialState,
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
            ...state.savedRoutes,
            saved_routes: state.savedRoutes.saved_routes.filter(route => route.route_id !== route_id) 
          }
        })),
    addSavedRoute: (route) => set((state) => ({
      savedRoutes: [...state.savedRoutes, route]
    })),
    setSavedRoutes: (newRoutes) => set({ savedRoutes: newRoutes }),
    setSearchRoutes: (newRoutes) => set({ searchRoutes: newRoutes }),
    setSearchHistory: (newHistory) => set({ searchHistory: newHistory }),
    clearState: () => set(initialState),  // Resets state
  }),
  {
    name: 'accessNYC-store', 
    getStorage: () => localStorage,
    partialize: (state) => ({
      loading: state.loading,
      userInfo: state.userInfo,
      routes: state.routes,
      searchRoutes: state.searchRoutes,
      searchHistory: state.searchHistory,
      savedRoutes: state.savedRoutes,
      serviceStatuses: state.serviceStatuses,
      currentPage: state.currentPage,
      from: state.from,
      to: state.to,
    }),
    serialize: (state) => {
      const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), encryptionKey).toString();
      return encryptedState;
    },
    deserialize: (storedState) => {
      try {
        const bytes = CryptoJS.AES.decrypt(storedState, encryptionKey);
        const decryptedState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedState || initialState;
      } catch (error) {
        return initialState; 
      }
    }
  }
));

export default useStore;

