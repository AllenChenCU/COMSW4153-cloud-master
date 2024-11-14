// src/components/ServiceStatus.js
import React from 'react';
import './ServiceStatus.css';

function ServiceStatus() {
  return (
    <section className="service-status">
      <h3 className="status-title">Service Status</h3>
      <div className="status-content">
        <div className="status-item">
          <h4>Delays</h4>
          <p>1, 2, 3, 4, B, D</p>
        </div>
        <div className="status-item">
          <h4>No Active Alerts</h4>
          <p>4, 5, 6, 7, A, C</p>
        </div>
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