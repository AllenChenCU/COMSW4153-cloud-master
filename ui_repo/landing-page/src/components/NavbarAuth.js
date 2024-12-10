// src/components/NavbarAuth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarAuth.css';

function NavbarAuth() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async() =>{
    try{
      await fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin',
      });
      navigate('/');
    } catch(error){
      console.error('Error logging out: ', error);
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
        </div>
        <div className="navbar-right">
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