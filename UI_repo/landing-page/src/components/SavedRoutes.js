import React, { useState } from 'react'
import './SavedRoutes.css';



function SavedRoutes() {
    const routes = [
        { id: 1, name: "Route A", info: "Details of Route A", location: { lat: 51.054342, lng: 3.717424 } },
        { id: 2, name: "Route B", info: "Details of Route B", location: { lat: 51.050622, lng: 3.730327 } },
        { id: 3, name: "Route C", info: "Details of Route C", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 4, name: "Route D", info: "Details of Route D", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 5, name: "Route E", info: "Details of Route E", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 6, name: "Route F", info: "Details of Route F", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 7, name: "Route G", info: "Details of Route G", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 8, name: "Route H", info: "Details of Route H", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 9, name: "Route I", info: "Details of Route I", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 10, name: "Route J", info: "Details of Route J", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 11, name: "Route K", info: "Details of Route K", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 12, name: "Route L", info: "Details of Route L", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 13, name: "Route M", info: "Details of Route M", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 14, name: "Route N", info: "Details of Route N", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 15, name: "Route O", info: "Details of Route O", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 16, name: "Route P", info: "Details of Route P", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 17, name: "Route Q", info: "Details of Route Q", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 18, name: "Route R", info: "Details of Route R", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 19, name: "Route S", info: "Details of Route S", location: { lat: 51.056534, lng: 3.708751 } },
        { id: 20, name: "Route T", info: "Details of Route T", location: { lat: 51.056534, lng: 3.708751 } },
      ];
    
    const [activeRoute, setActiveRoute] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isScrollLocked, setIsScrollLocked] = useState(false);
    const routesPerPage = 5;

    const handleDropdownToggle = (routeIndex) => {
        if (activeRoute === routeIndex) {
          setActiveRoute(null);
          unlockScrolling();
        } else {
          setActiveRoute(routeIndex);
          lockScrolling();
        }
      };
    
      const lockScrolling = () => {
        document.body.style.overflow = "hidden";
        setIsScrollLocked(true);
      };
    
      const unlockScrolling = () => {
        document.body.style.overflow = "auto";
        setIsScrollLocked(false);
      };
    
      const paginateRoutes = () => {
        const start = currentPage * routesPerPage;
        const end = start + routesPerPage;
        return routes.slice(start, end);
      };

      const deleteRoute = (routeId) => {
        const newRoutes = routes.filter((route) => route.id !== routeId);
        //setRoutes(newRoutes);
    
        // If deleting a route causes an index problem for pagination, fix it
        const totalPages = Math.ceil(newRoutes.length / routesPerPage);
        if (currentPage >= totalPages) {
          setCurrentPage(totalPages - 1);
        }
      };
    
      const totalPages = Math.ceil(routes.length / routesPerPage);
    
      const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        unlockScrolling(); // Ensure unlock scrolling when navigating pages
        setActiveRoute(null);
      };
  
      return (
        <div className="route-container">
        <div className="route-list-container">
          {paginateRoutes().map((route, index) => (
            <div key={route.id} className="route-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <button
                  className="btn btn-purple flex-grow-1 me-2"
                  onClick={() => handleDropdownToggle(index)}
                >
                  {route.name}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRoute(route.id)}
                >
                  Delete
                </button>
              </div>
              {activeRoute === index && (
  <div className="dropdown-content p-3 border custom-dropdown">
    <div
      id={`map-${index}`}
      className="map-container"
    >
      <img
        src="https://via.placeholder.com/600x400" // Replace with your actual map/image
        alt="Map"
        className="map-placeholder"
      />
    </div>
    <h5 className="mt-3 step-title">Step Directions</h5>
    {/* <ul className="step-list">
      {route.steps.map((step, stepIndex) => (
        <li key={stepIndex}>{step}</li>
      ))}
    </ul> */}
  </div>
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
    );
  };


export default SavedRoutes