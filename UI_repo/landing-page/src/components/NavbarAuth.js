// src/components/NavbarAuth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarAuth.css';
import useStore from '../state/useStore';

function NavbarAuth({ isSearch }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const clear = useStore((state) => state.clearState);
  const setErrorMessage = useStore((state) => state.setError);
  const [logoutError, setLogoutError] = useState(''); 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async() =>{
    try{
      await fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin',
      });
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('accessNYC-store');
      clear();
      navigate('/');
    } catch(error){
      console.error('Error logging out: ', error);
      setLogoutError('Error logging out. Please try again.');
      setTimeout(() => setLogoutError(''), 1000);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar}>
            Menu
          </button>
          <div className="logo">
            <img src="path/to/logo.png" alt="AccessNYC Logo" className="logo-icon" />
            <span className="logo-text">AccessNYC</span>
          </div>
          {logoutError && <p className="error-message">{logoutError}</p>}
        </div>
        <div className="navbar-right">
        <button className='nav-button' onClick={() => {setErrorMessage(''); setLogoutError(''); (isSearch ? navigate('/login') : navigate('/history')); }}> {isSearch ? 'Back' : 'Show History'} </button>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
          {/*<button className="nav-button">Real-time Updates</button>
          <button className="nav-button">Accessible Routes</button>
          <button className="nav-button">Route Notifications</button>
          <button className="nav-button">Real-Time Status</button>*/}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <button className="close-button" onClick={toggleSidebar}>×</button>
          <ul>
            <li> 
            <a href = "https://new.mta.info/accessibility/access-a-ride" target="_blank" rel="noopener noreferrer"> 
              LIRR Care Program
              </a> 
            </li>

            <li>
              <a href = "https://new.mta.info/accessibility/pcas-and-service-animals-reasonable-accommodations" target="_blank" rel="noopener noreferrer"> 
              PCAs and service animals 
              </a> 
             </li>
            <li>
            <a href = "https://new.mta.info/accessibility/access-a-ride" target="_blank" rel="noopener noreferrer"> 
                Access-A-Ride Information
              </a> 
            </li>
            <li>
              <a href = "https://new.mta.info/fares/reduced-fare" target="_blank" rel="noopener noreferrer"> 
                Reduced-Fare Information 
              </a> 
            </li>
            <li> 
              <a href = "https://new.mta.info/accessibility/metro-north-care" target="_blank" rel="noopener noreferrer"> 
                Metro-North Care Program 
              </a> 
            </li>
            <li>
              <a href = "https://new.mta.info/accessibility/stations" target="_blank" rel="noopener noreferrer"> 
              List of MTA Accessible Stations
              </a> 
            </li>
            <li>
              <a href = "https://new.mta.info/accessibility/mta-railroads" target="_blank" rel="noopener noreferrer"> 
              Accessible travel by Commuter Rail
              </a> 
            </li>
            <li>
              <a href = "https://new.mta.info/accessibility/contact" target="_blank" rel="noopener noreferrer"> 
                Contact Us 
              </a> 
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavbarAuth;