import React, { useEffect, useState } from 'react'
import './SearchResults.css';
import useStore from '../state/useStore';
import uuid from 'react-uuid';
import GoogleMap from './GoogleMap';

function SearchResults() {
      const [selectedRoute, setSelectedRoute] = useState(null);
      const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
      const searchRoutes = useStore((state) => state.searchRoutes);
      const loading = useStore((state) => state.loading);
      const userInfo = useStore((state) => state.userInfo);
      const setLoading = useStore((state) => state.setLoading);
      const setErrorMessage = useStore((state) => state.setError);
      const errorMessage = useStore((state) => state.errorMessage);
      const [message, setMessage] = useState('');
      const from = useStore((state) => state.from);
      const to = useStore((state) => state.to);
       
  

      const addRoute = (from, to ,route) => {
        setLoading(true);
        const query_id = uuid()
        
        fetch('http://localhost:3000/save-route', {
          method: 'POST',
          body: JSON.stringify({"source": from, "destination": to, "user_id": `${userInfo.id}`, "query_id": query_id,  "to_email": userInfo.email, "route": route }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        }).then(response => {
          if (!response.ok) {
           setErrorMessage('Failed to save route', response.status);
          }
          return response.json();
        }).then(data => {
          console.log('data:', data);
          setMessage(data.message + " Check your email for confirmation!");
          setTimeout(() => {
            setMessage('');
          }, 1500);
          setLoading(false);
        }).catch(error => {
          console.error(error);
          setLoading(false);
          setErrorMessage(error.message);     
  
      });
      };
    
      return (
        <div className='search-results'>
          {/* Left side: Search Results */}
          <div className="search-results-left">
            <h3>Routes</h3>
            {searchRoutes.map((route,index) => (
              <div
                key={index}
                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                onClick={() => {setMessage(''); setSelectedRoute(route); setCurrentRouteIndex(index + 1);}}
              >
                <h3>Route {index + 1}</h3>
                {route.legs[0].start_address + " to " + route.legs[0].end_address}
              </div>
            ))}
          </div>
    
          {/* Right side: Route Details & Map */}
          <div className="search-results-right">
            {selectedRoute ? (
              <>
                <GoogleMap routeData={selectedRoute} />
              
        <div className="action-buttons">
                {loading && (
                  <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' }}>
                  {/* <span class="sr-only">Loading...</span> */}
                </div>)}
                    <button onClick={() => addRoute(from, to , selectedRoute)} disabled={loading}>Save Route</button>
                    {message && !errorMessage && <p>{message}</p>}
                    {errorMessage && !message && <p>{errorMessage}</p>}
          </div>
    
                {/* Route Info */}
                <h3 className="route-title">Route {currentRouteIndex}</h3>

                {selectedRoute.legs.map((leg, legIndex) => (
                  <div  key={legIndex}>
                    <h4><b>Start:</b> {leg.start_address}</h4>
                    <h4><b>End:</b> {leg.end_address}</h4>
                    <p>distance: {leg.distance.text}</p>
                    <p>Duration: {leg.duration.text}</p>
                    <h5>Steps:</h5>
                    {leg.steps.map((step, stepIndex) => (<>
                      <p><b><u>step # {stepIndex + 1}</u></b></p>
                      <div key={stepIndex}>
                        <p>instructions: {step.html_instructions}</p>
                        <p>distance: {step.distance.text}</p>
                        <p>duration: {step.duration.text}</p>
                      </div>
                      </>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <p>Select a route to see the details.</p>
            )}
          </div>
        </div>
      );
    };

export default SearchResults