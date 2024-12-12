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
<<<<<<< HEAD
              window.location.href = 'https://access-nyc-437301-k9.ue.r.appspot.com' // 'http://localhost:8080/auth/google'
=======
              window.location.href = 'https://accessnyc.ngrok-free.app/auth/google' // 'http://localhost:8080/auth/google'
>>>>>>> c00b2b941aa0715403667c5c2ed2c3bf1d15db8c
            }}
        >   
          Sign with Google
        </button>
      </div>
      <div className="hero-image">
<<<<<<< HEAD
        <img src="static/mta.jpg" alt="MTA Subway" />
=======
        <img src="/mta.jpg" alt="MTA Subway" />
>>>>>>> c00b2b941aa0715403667c5c2ed2c3bf1d15db8c
      </div>
    </section>
  );
}

export default HeroSection;