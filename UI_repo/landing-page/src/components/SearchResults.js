import React, { useState } from 'react'
import './SearchResults.css';

function SearchResults() {
    const routes = [
        { id: 1, name: "Route A", info: "Details of Route A", location: { lat: 51.054342, lng: 3.717424 } },
        { id: 2, name: "Route B", info: "Details of Route B", location: { lat: 51.050622, lng: 3.730327 } },
        { id: 3, name: "Route C", info: "Details of Route C", location: { lat: 51.056534, lng: 3.708751 } },
      ];
    
      const [selectedRoute, setSelectedRoute] = useState(null);
    
      return (
        <div className='search-results'>
          {/* Left side: Search Results */}
          <div className="search-results-left">
            <h3>Routes</h3>
            {routes.map((route) => (
              <div
                key={route.id}
                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                onClick={() => setSelectedRoute(route)}
              >
                {route.name}
              </div>
            ))}
          </div>
    
          {/* Right side: Route Details & Map */}
          <div className="search-results-right">
            {selectedRoute ? (
              <>
                {/* Google Map */}
                {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '300px' }}
                    center={selectedRoute.location}
                    zoom={14}
                  >
                    <Marker position={selectedRoute.location} />
                  </GoogleMap>
                </LoadScript> */}
                <img
          src="https://via.placeholder.com/600x400" // Replace with your actual map/image
          alt="Map"
          className="map-placeholder"
        />
    
                {/* Route Info */}
                <h3>{selectedRoute.name}</h3>
                <p>{selectedRoute.info}</p>
                <div className="action-buttons">
                    <button>Save Route</button>
                </div>
              </>
            ) : (
              <p>Select a route to see the details.</p>
            )}
          </div>
        </div>
      );
    };

export default SearchResults