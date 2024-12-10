import React, { useEffect, useState } from 'react';
import './LoginLandingPage.css';
import '../App.css';
import Navbar from './Navbar';
import TripPlanner from './TripPlanner';
import ServiceStatus from './ServiceStatus';
import SearchResults from './SearchResults';
import useStore from '../state/useStore';
import SavedRoutes from './SavedRoutes';

function LoginLandingPage() {
  // set user state jwt token here 
  const [user, setUser] = useState(null);
  const { loading, searchRoutes } = useStore

  // TODO update and change 
  useEffect(() => {
    fetch('/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched user:', data); 
        setUser(data);
      })
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

      <div className="saved-routes">
        <h2>View Saved Routes</h2>
        <div className="routes-container">
          <SavedRoutes />
        </div>
      </div>

      <div className="main-section">
        <TripPlanner />
        <div className="saved-routes">
        <h2>Search results:</h2>
        <div>
          <ServiceStatus />
          <div className="map-section">
            <SearchResults />
          </div>
          </div>
        {/* {searchRoutes ? (
          <div>
          <ServiceStatus />
          <div className="map-section">
            <SearchResults />
          </div>
          </div>
        ) : (
           null
        )} */}
          
        </div>
      </div>

      {/* Map Section */}

      {/* Buttons Section */}
      {/* <div className="action-buttons">
        <button>Log in to Permanent Access-A-Ride Service</button>
        <button>Learn About the LIRR Care Program</button>
        <button>Check Elevator or Escalator Status</button>
        <button>Sign up for Our Newsletter</button>
      </div> */}
    </div>
  );
}

export default LoginLandingPage;