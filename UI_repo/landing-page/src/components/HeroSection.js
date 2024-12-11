// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Find Accessible Routes Now NYC With</h1>
        <p className="hero-subtitle">
          Heyyy Access NYC: Navigate the MTA with ease and accessibility in mind for individuals with mobility impairments.
        </p>
        <button
            className="cta-button"
            onClick={() => {
              window.location.href = 'https://accessnyc.ngrok-free.app/auth/google' // 'http://localhost:8080/auth/google'
            }}
        >   
          Sign with Google
        </button>
      </div>
      <div className="hero-image">
        <img src="/mta.jpg" alt="MTA Subway" />
      </div>
    </section>
  );
}

export default HeroSection;