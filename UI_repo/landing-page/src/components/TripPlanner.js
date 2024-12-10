// src/components/TripPlanner.js
import React from 'react';
import './TripPlanner.css';

function TripPlanner() {
  return (
    <section className="trip-planner">
      <h3 className="trip-title">Plan a Trip</h3>
      <form className="trip-form">
        <div className="input-group">
          <label className="trip-label">From</label>
          <input type="text" placeholder="Address, station, landmark" className="trip-input" />
        </div>
        
        <div className="input-group">
          <label className="trip-label">To</label>
          <input type="text" placeholder="Address, station, landmark" className="trip-input" />
        </div>
        
        {/* <div className="time-options">
          <label className="time-label">
            <input type="radio" name="time" value="leaveNow" checked /> Leave Now
          </label>
          <label className="time-label">
            <input type="radio" name="time" value="changeTime" /> Change Time
          </label>
        </div>
        
        <label className="accessible-trip">
          <input type="checkbox" /> Accessible Trip
        </label> */}
        
        <button type="submit" className="trip-button">Plan My Trip</button>
      </form>
    </section>
  );
}

export default TripPlanner;