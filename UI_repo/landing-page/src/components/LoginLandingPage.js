import React, { useEffect, useState } from 'react';
import './LoginLandingPage.css';
import '../App.css';
import NavbarAuth from './NavbarAuth';
import TripPlanner from './TripPlanner';
import ServiceStatus from './ServiceStatus';
import SearchResults from './SearchResults';
import useStore from '../state/useStore';
import SavedRoutes from './SavedRoutes';

function LoginLandingPage() {
  // set user state jwt token here 
  const setUserInfo = useStore((state) => state.setUserInfo);
  const userInfo = useStore((state) => state.userInfo);
  const searchRoutes = useStore((state) => state.searchRoutes);
  const [showSavedRoutes, setShowSavedRoutes] = useState(false);
  const errorMessage = useStore((state) => state.errorMessage);

  // TODO update and change 
  useEffect(() => {
    if (!userInfo) {
      fetch('/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log('data:', data);
        setUserInfo(data);
      })
      .catch((error) => console.error('Error fetching user:', error));
    }
    
  }, [setUserInfo, userInfo]);

  useEffect(() => {
    if(userInfo && userInfo?.id){ 
      setShowSavedRoutes(true);
    }
  }, [userInfo, userInfo?.id]);

  return (
    <div className="login-landing-page">
      <NavbarAuth isSearch={false} />

      {/* Welcome Section */}
      <div className="welcome-section">
        {userInfo ? (
          <>
            <h1>Hi, {userInfo.displayName}!</h1>
            <p>Welcome back to AccessNYC!</p>
          </>
        ) : (
          <h1>Loading user data...</h1>
        )}
      </div>

      <div className="saved-routes">
        <h2>View Saved Routes and Stations</h2>
        <div className="routes-container">
          {showSavedRoutes && <SavedRoutes />}
        </div>
      </div>

      <div className="main-section">
        <TripPlanner />
 
        
       {searchRoutes.length > 0 && !errorMessage ? (
         <div className="saved-routes">
          <h2>Search results:</h2>
            <div>
            <ServiceStatus />
            <div className="map-section">
              <SearchResults />
            </div>
            </div>
            </div>
        ) : (
          null
        )} 

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
          
       
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