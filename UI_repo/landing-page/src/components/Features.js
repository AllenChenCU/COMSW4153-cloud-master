import React from 'react';
import './Features.css';
function Features() {
    return (
        <section className="features-section">
            <h2>MTA Accessibility</h2>
            <p>Discover seamless, accessible commuting in NYC</p>
            <div className="features-container">
                <div className="feature-box">
                    <img src="static/Accesibility.webp" alt="Accessible Routing" />
                    <h3>Accessible Routing</h3>
                    <p>Navigate NYC’s Metro with confidence using routes optimized for accessibility</p>
                    <button>Learn More</button>
                </div>
                <div className="feature-box">
                    <img src="mta.jpg" alt="Accessibility Alerts" />
                    <h3>Accessibility Alerts</h3>
                    <p>Never miss an update with real-time alerts for elevators and escalators</p>
                    <button>Learn More</button>
                </div>
                <div className="feature-box">
                    <img src="Routes.jpg" alt="Route Planning" />
                    <h3>Route Planning</h3>
                    <p>Easily plan your trips with accessible route suggestions</p>
                    <button>Learn More</button>
                </div>
            </div>
        </section>
    );
}

export default Features;