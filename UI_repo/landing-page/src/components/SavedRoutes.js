import React, { useCallback, useState, useEffect } from 'react'
import './SavedRoutes.css';
import useStore from '../state/useStore';
import SavedServices from './SavedServices';
import GoogleMap from './GoogleMap';



function SavedRoutes() {
  
    const [activeRoute, setActiveRoute] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const userInfo = useStore((state) => state.userInfo);
    const setLoading = useStore((state) => state.setLoading);
    const loading = useStore((state) => state.loading);
    const savedRoutes = useStore((state) => state.savedRoutes);
    const setSavedRoutes = useStore((state) => state.setSavedRoutes);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [savedRoutesLoading, setSavedRoutesLoading] = useState(false);
    const deleteSavedRoute = useStore((state) => state.deleteSavedRoute);
    const routesPerPage = 5;


    const refresh = useCallback(() => {
      const token = localStorage.getItem('jwtToken');
      setLoading(true);
      setSavedRoutesLoading(true);

      fetch(`http://localhost:3000/get-saved-routes-and-stations?user_id=${userInfo?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (!response.ok) {
         setErrorMessage('Failed to fetch saved route', response.status);
        }
        return response.json();
      }).then(data => {
        setSavedRoutes(data);
        setLoading(false);
        setSavedRoutesLoading(false);
      }).catch(error => {
        setErrorMessage(error.message);
        setLoading(false);
        setSavedRoutesLoading(false);   

    });
    } , [setLoading, setSavedRoutes, userInfo?.id]);


    useEffect(() => {
      if (savedRoutes.length === 0 && userInfo?.id) {
        refresh();
      }
    }, [refresh, savedRoutes.length, userInfo?.id]);



    const handleDropdownToggle = (routeIndex,route) => {
        if (activeRoute === routeIndex) {
          setActiveRoute(null);
          setSelectedRoute(null);
        } else {
          setActiveRoute(routeIndex);
          setSelectedRoute(route);
        }
      };

      const paginateRoutes = () => {
        const start = currentPage * routesPerPage;
        const end = start + routesPerPage;
        return savedRoutes["saved_routes"].slice(start, end);
      };

      const deleteRoute = (route_id, route) => {
        setLoading(true);
        fetch('http://localhost:3000/unsave-route?route_id=' + route_id, {
          method: 'PUT',
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
          deleteSavedRoute(route_id)
          const totalPages = Math.ceil(savedRoutes["saved_routes"]?.length / routesPerPage);
          if (currentPage >= totalPages) {
            setCurrentPage(totalPages - 1);
          }
    
          setLoading(false);
        }).catch(error => {
          setLoading(false);
          setErrorMessage(error.message);     
  
      });
    
      };
    
      const totalPages = Math.ceil(savedRoutes["saved_routes"]?.length / routesPerPage);
    
      const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        setActiveRoute(null);
      };

      if (savedRoutesLoading) {
        return     <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' }}>
        {/* <span class="sr-only">Loading...</span> */}
      </div> 
      }
      
      if (errorMessage) {
        return <div className="error-message">{errorMessage}</div>;
      }

      return (
        <>
        <div className="route-container">
        <div className="route-list-container">
          <button className="btn btn-primary" style={{marginBottom: '10px'}} onClick={() => refresh()} disabled={savedRoutesLoading}>Refresh</button>
          {savedRoutes["saved_routes"] && paginateRoutes().map((info, index) => (
            <div key={info.user_id} className="route-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <button
                  className="btn btn-purple flex-grow-1 me-2"
                  onClick={() => handleDropdownToggle(index, info.route)}
                >
                   {info['route'].legs[0].start_address} to {info['route'].legs[0].end_address}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRoute(info.route_id, info.route)}
                >
                  Delete
                </button>
              </div>
              {activeRoute === index && (
  <div className="dropdown-content p-3 border custom-dropdown">
   <>
                <GoogleMap routeData={selectedRoute} />
    
                {/* Route Info */}

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
  </div>
)}

{savedRoutes["saved_routes"].length === 0 && (
  <p className="no-data-message">No Saved Routes</p>
)}

            </div>
          ))}
  
          {/* Pagination */}
          <div className="pagination-container mt-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                className={`btn btn-secondary me-2 ${
                  currentPage === index ? "active" : ""
                }`}
                key={index}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        
      </div>

      <h2>Saved Stations</h2>
      <div className="saved-stations-container">
        {savedRoutes["stations_from_saved_routes"] && <SavedServices savedRoutes={savedRoutes} />}
      </div>
</>
    );
  };


export default SavedRoutes