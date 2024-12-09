import React, { useEffect, useState } from 'react';
import './LoginLandingPage.css';
import Navbar from './Navbar';
import TripPlanner from './TripPlanner';
import ServiceStatus from './ServiceStatus';

function LoginLandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/profile') // Fetch user data from backend
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  return (
    <div className="login-landing-page">
      <Navbar />

      {/* Welcome Section */}
      <div className="welcome-section">
        {user ? (
          <>
            <h1>Hi, {user.displayName}!</h1>
            <p>Welcome back to AccessNYC!</p>
          </>
        ) : (
          <h1>Loading user data...</h1>
        )}
      </div>

      <div className="main-section">
        <TripPlanner />
        <ServiceStatus />
      </div>

      {/* Map Section */}
      <div className="map-section">
        <img
          src="https://via.placeholder.com/1200x600" // Replace with your actual map/image
          alt="Map"
          className="map-placeholder"
        />
      </div>

      {/* Saved Routes Section */}
      <div className="saved-routes">
        <h2>View Saved Routes and Service Updates</h2>
        <div className="routes-container">
          <p>Saved routes and updates will appear here.</p>
        </div>
      </div>

      {/* Buttons Section */}
      {/*<div className="action-buttons">
        <button>Log in to Permanent Access-A-Ride Service</button>
        <button>Learn About the LIRR Care Program</button>
        <button>Check Elevator or Escalator Status</button>
        <button>Sign up for Our Newsletter</button>
      </div>*/}
    </div>
  );
}

export default LoginLandingPage;