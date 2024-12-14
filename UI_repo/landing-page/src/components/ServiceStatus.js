// src/components/ServiceStatus.js
import React, { useEffect,useState, useMemo } from 'react';
import './ServiceStatus.css';
import useStore from '../state/useStore';

function ServiceStatus() {
   const serviceStatuses = useStore((state) => state.serviceStatuses);
   const searchRoutes = useStore((state) => state.searchRoutes);
   const setLoading = useStore((state) => state.setLoading);
   const loading = useStore((state) => state.loading);
   const from = useStore((state) => state.from);
   const [servicesKey, setServicesKey] = useState([]);
   const [outagesData, setOutagesData] = useState([]);
   const [error, setError] = useState(null);
   const currentErrors = useMemo(() => [], []);


   useEffect(() => {
    setLoading(true);
    const stations = Array.from(
      new Set(
        searchRoutes.flatMap(route =>
          route["legs"][0]["steps"].reduce((acc, step) => {
            if (step["travel_mode"] === "TRANSIT") {
              acc.push(step["transit_details"]["departure_stop"]["name"]);
              acc.push(step["transit_details"]["arrival_stop"]["name"]);
            }
            return acc;
          }, [])
        )
      )
    );
    
    if (stations.length > 0) {
      setServicesKey(stations);
    }
  

    if (stations.length > 0) {
      const token = localStorage.getItem('jwtToken');
       
      Promise.all(stations.map(route => 
        fetch(`https://comsw4153-mta-service-973496949602.us-central1.run.app/protected-outages/${route}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error(`Error fetching route ${route}:`, error);
          currentErrors[route] = { outages: 'No outages' };

          return { outages: 'No outages' };
        })
      ))
      .then(results => {

        const outagesDataMap = stations.reduce((acc, route, index) => {
          if (results[index] !== null) {
            acc[route] = results[index];
          } else {
            acc[route] = [{ outages: 'No outages' }];
          }
          return acc;
        }, {});
      
        
        const noOutages = Object.values(outagesDataMap).every(route => route.outages === 'No outages');
        
        if (noOutages) {
          setError('There are no outages.');
        } else {
          setOutagesData(outagesDataMap);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error in Promise.all:', error);
        setLoading(false);
        setError(error.message);
      });
      
      
    }


  }, [currentErrors, searchRoutes, setLoading]);
  
  return (
    <section className="service-status">
    <h3 className="status-title">Service Status</h3>
    <div className="status-content">
    {servicesKey.map((serviceKey, index) => {
  const status = serviceStatuses[0][serviceKey];
  const outages = currentErrors[serviceKey] ? [] : outagesData[serviceKey]

  if (error) {
    return (
      <div className="status-item" key={index}>
        <div className="status-header">
          <h4>Station: {serviceKey}</h4>
        </div>
        <p>No Information Available.</p>
      </div>
    );
  }else if (status || outages) {
    return (
      <div className="status-item" key={index}>
        <div className="status-header">
          <h4>Station: {serviceKey}</h4>
        </div>
        
        <div className="status-content">
          <h5>Equipment Information:</h5>
          <div className="equipment-info">
            {status?.length > 0 && status.map((status, index) => (
              <div className="equipment-section" key={index}>
                <h4>Equipment {index + 1}:</h4>
                                {(
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
                ) ? (
                  <div>
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
                  </div>
                ) : (
                  <p>No equipment information available.</p>
                )}
                {index !== status.length - 1 && <hr />}

              </div>
            ))}
            {status?.length === 0  && <p>No equipment information available</p>}
          </div>
          
          <h5>Outages:</h5>
          {outages?.length > 0 && outages.map((outage, index) => (
            <div className="outage-section" key={index}>
              <h4>Outage {index + 1}:</h4>
                            {(
                outage.reason || 
                outage.estimatedreturntoservice || 
                outage.serving || 
                outage.station || 
                outage.trainno
              ) ? (
                <div>
                  {outage.reason && <p> <b>Reason:</b> {outage.reason}</p>}
                  {outage.estimatedreturntoservice && <p> <b>Estimated Return:</b> {outage.estimatedreturntoservice}</p>}
                  {outage.serving && <p> <b>Serving:</b>{outage.serving}</p>}
                  {outage.station && <p><b>Station:</b>{outage.station}</p>}
                  {outage.trainno && <p><b>Train No:</b>: {outage.trainno}</p>}
                </div>
              ) : (
                <p>No Active Outages.</p>
              )}
            </div>
          ))}
          {outages?.length === 0 && <p>No Active Outages</p>}
        </div>
      </div>
      );
        } else {
          return (
            <div className="status-item" key={index}>
              <h4>{serviceKey}</h4>
              <p>Status: No active alerts</p>
            </div>
          );
        }
      })}
    </div>
  </section>
      );
}

export default ServiceStatus;


// // src/components/ServiceStatus.js
// import React, { useState, useEffect } from 'react';
// import './ServiceStatus.css';

// function ServiceStatus() {
//   const [statusData, setStatusData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Replace 'station-name' with the specific station you want to query.
//     fetch('http://localhost:5001/outages/station-name')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setStatusData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <section className="service-status">
//       <h3 className="status-title">Service Status</h3>
//       <div className="status-content">
//         {statusData.map((status, index) => (
//           <div className="status-item" key={index}>
//             <h4>{status.station}</h4>
//             <p>Status: {status.reason}</p>
//             <p>Estimated Return: {status.estimatedreturntoservice}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default ServiceStatus;