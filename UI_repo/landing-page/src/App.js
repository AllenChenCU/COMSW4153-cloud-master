// src/App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Tagline from './components/Tagline';
//import TripPlanner from './components/TripPlanner';
//import ServiceStatus from './components/ServiceStatus';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginLandingPage from './components/LoginLandingPage';
import SearchHistory from './components/SearchHistory';
import OAuthCallback from './components/OAuthCallback';
import './App.css';
import useStore from './state/useStore';

function MainLandingPage() {
  useEffect(() => {
    localStorage.removeItem('accessNYC-store');
    localStorage.removeItem('jwtToken');
  }, []);

  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Tagline />
      {/*<div className="main-section">
        <TripPlanner />
        <ServiceStatus />
      </div>*/}
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

function App() {
  const userInfo = useStore((state) => state.userInfo);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback/>} />
        <Route path='*' element={<Navigate to="/" replace/>} />
         {/* Protected Routes */}
        <Route path='/login' element={ userInfo?.id ? <LoginLandingPage /> : <Navigate to="/" replace/>} />
        <Route path='/history' element={ userInfo?.id ? <SearchHistory /> : <Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
}

export default App;