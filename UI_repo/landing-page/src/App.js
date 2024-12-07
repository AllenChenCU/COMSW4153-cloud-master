// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Tagline from './components/Tagline';
import TripPlanner from './components/TripPlanner';
import ServiceStatus from './components/ServiceStatus';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginLandingPage from './components/LoginLandingPage';
import './App.css';

function MainLandingPage() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Tagline />
      <div className="main-section">
        <TripPlanner />
        <ServiceStatus />
      </div>
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/login" element={<LoginLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;