// src/App.js

import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Tagline from './components/Tagline';
import TripPlanner from './components/TripPlanner';
import ServiceStatus from './components/ServiceStatus';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
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

export default App;