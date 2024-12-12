import React, { useState, useEffect } from 'react'
import './SavedRoutes.css';
import useStore from '../state/useStore';



function SavedServices({ savedRoutes }) {
    
    const [activeRoute, setActiveRoute] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const userInfo = useStore((state) => state.userInfo);
    const setLoading = useStore((state) => state.setLoading);
    const loading = useStore((state) => state.loading);
    const [serviceStatuses, setServiceStatuses] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [serviceLoading, setServiceLoading] = useState(false);
    const [serviceKeys, setKeys] = useState([]);

    const servicesPerPage = 5;

    useEffect(() => {
        setLoading(true);
        setServiceLoading(true);

        const result = {};
        let keys = [];
        savedRoutes["stations_from_saved_routes"]?.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            if (!result[key]) {
              result[key] = obj[key];
              keys.push(key);
            }
          });
        });
        const uniqueStations = [...new Map(Object.entries(result))].map(([key, value]) => ({ [key]: value }));
        setKeys(keys);
        setServiceStatuses( Object.assign({}, ...uniqueStations));
        setServiceLoading(false);
        setLoading(false);

    }, [savedRoutes, setLoading, userInfo]);

    const handleDropdownToggle = (routeIndex,serviceName) => {
        if (activeRoute === routeIndex) {
          setActiveRoute(null);
          setSelectedRoute(null);
        } else {
          setActiveRoute(routeIndex);
          setSelectedRoute(serviceStatuses[serviceName]);
        }
      };
    
      const paginateRoutes = () => {
        const start = currentPage * servicesPerPage;
        const end = start + servicesPerPage;
        return serviceKeys.slice(start, end);
      };
    
      const totalPages = Math.ceil(serviceKeys.length / servicesPerPage);
    
      const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        setActiveRoute(null);
      };

      if (serviceLoading) {
        return     <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' }}>
        {/* <span class="sr-only">Loading...</span> */}
      </div> 
      }
  
      return (
        <>
        <div className="route-container">
        <div className="route-list-container">
          {paginateRoutes().map((serviceName, index) => (
            <div key={index} className="route-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <button
                  className="btn btn-purple flex-grow-1 me-2"
                  onClick={() => handleDropdownToggle(index, serviceName)}
                >
                   {serviceName}
                </button>
              </div>
              {activeRoute === index && (
  <div className="dropdown-content p-3 border custom-dropdown">
    <div>
            {selectedRoute?.length > 0 && selectedRoute.map((status, index) => (
              <div key={index}>
                <div className="equipment-details">
                    <h4>Equipment {index + 1}:</h4>
                    {status.serving && <p> <b>Serving Line:</b>{status.serving}</p>}
                    {status.trainno && <p> <b>Train no.:</b> {status.trainno}</p>}
                    {status.equipmentno && <p> <b>Equipment no.:</b>{status.equipmentno}</p>}
                    {status.equipmenttype && <p> <b>Equipment type:</b> {status.equipmenttype}</p>}
                    {status.ADA && <p> <b>ADA:</b>{status.ADA}</p>}
                    {status.isactive && <p> <b>isActive:</b> {status.isactive}</p>}
                    {status.shortdescription && <p> <b>Short description:</b> {status.shortdescription}</p>}
                    {status.lineservedbyelevator && <p><b>Line served by Elevator:</b>{status.lineservedbyelevator}</p>}
                    {status.nextadanorth && <p> <b>Next ADA north:</b> {status.nextadanorth}</p>}
                    {status.nextadasouth && <p> <b>Next ADA south:</b> {status.nextadasouth}</p>}
                    {status.busconnections && <p> <b>Bus connections:</b>{status.busconnections}</p>}
                    {status.alternateroute && <p> <b>Alternate Route:</b>{status.alternateroute}</p>}
                    {status.estimatedreturntoservice && <p> <b>Estimated Return:</b>{status.estimatedreturntoservice}</p>}

                    {index !== status.length - 1 && <hr />}

                    {!(
                    status.serving || 
                    status.trainno || 
                    status.equipmentno || 
                    status.equipmenttype || 
                    status.ADA || 
                    status.isactive || 
                    status.shortdescription || 
                    status.lineservedbyelevator || 
                    status.nextadanorth || 
                    status.nextadasouth || 
                    status.busconnections || 
                    status.alternateroute || 
                    status.estimatedreturntoservice
                    ) && <p>No equipment information available.</p>}
                </div>
              </div>
            ))}

            {selectedRoute.length === 0 && <p>No equipment information available.</p>}
          </div>

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
      </>
    );
  };


export default SavedServices