// src/components/TripPlanner.js
import React, { useState } from 'react';
import './TripPlanner.css';
import useStore from '../state/useStore';

function TripPlanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const userInfo = useStore((state) => state.userInfo);
  const setSearchRoutes = useStore((state) => state.setSearchRoutes);
  const setServiceStatuses = useStore((state) => state.setServiceStatuses);
  const setLoading = useStore((state) => state.setLoading);
  const isLoading = useStore((state) => state.loading);
  const setErrorMessage = useStore((state) => state.setError);
  const setSavedTo = useStore((state) => state.setTo);
  const setSavedFrom = useStore((state) => state.setFrom);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your trip planning logic here
    setLoading(true);

    fetch('http://localhost:3000/query-routes-and-stations?source=' + from + '&destination=' + to + '&user_id=' + userInfo.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log('data:', data);
      setSearchRoutes(data['routes']);
      setSavedFrom(from);
      setSavedTo(to);
      const uniqueStations = Array.from(
        new Map(data['stations'].map(station => [station.station, station])).values()
      );
      console.log('uniqueStations:', data['stations']);
      setServiceStatuses(uniqueStations);

      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
      setErrorMessage(error.message);

    })

  }
  return (
    <section className="trip-planner">
        {isLoading && (
    <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' }}>
    {/* <span class="sr-only">Loading...</span> */}
  </div>
  )}

      <h3 className="trip-title">Plan a Trip</h3>
      <form className="trip-form">
        <div className="input-group">
          <label className="trip-label">From</label>
          <input type="text" placeholder="Address, station, landmark" className="trip-input" disabled={isLoading} onChange={(e) => {setFrom(e.target.value);}}/>
        </div>
        
        <div className="input-group">
          <label className="trip-label">To</label>
          <input type="text" placeholder="Address, station, landmark" className="trip-input" disabled={isLoading} onChange={(e) => {setTo(e.target.value);}}/>
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
        
        <button type="submit" className="trip-button" disabled={isLoading} onClick={handleSubmit}>Plan My Trip</button>
      </form>
    </section>
  );
}

export default TripPlanner;