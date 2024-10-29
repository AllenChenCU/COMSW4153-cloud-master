let currentPage = 1;
const limit = 10;
let current_route = 0;

document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "test@example.com" && password === "password123") {
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

function fetchMTAAlerts(station) {
    fetch(`http://3.84.62.68:5001/outages/${station}`)
        .then(response => response.json())
        .then(data => {
            const alertsContent = document.getElementById('alerts_container');
            alertsContent.innerHTML = ''

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(alert => {
                    const alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-warning');
                    alertElement.textContent = `Alert: ${alert.serving} \n Reason: ${alert.reason} at ${alert.timestamp_at_save}`;
                    alertsContent.appendChild(alertElement);
                });
            } else {
                alertsContent.innerHTML = '<p>No recent alerts available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching MTA alerts:', error);
            const alertsContent = document.getElementById('alerts-content');
            alertsContent.innerHTML = '<div class="alert alert-danger">Error fetching alerts.</div>';
        });
}


function showDetails(leg,index) {
    const pathDetails = document.getElementById('path-details');
    pathDetails.innerHTML = '';

    pathDetails.innerHTML = `
            <div class="card">
            <div class="card-body">
                <h5 class="card-title"> Route ${index + 1}</h5>
                 <p class="card-text"><b>Start:</b> ${leg.start_address}</p>
                  <p class="card-text"><b>End:</b> ${leg.end_address}</p>
                <p class="card-text"><b>Arrival Time:</b> ${leg.arrival_time.text}</p>
                <p class="card-text"><b>Departure Time:</b> ${leg.departure_time.text}</p>
                <p class="card-text"><b>Distance:</b> ${leg.distance.text}</p>
                <p class="card-text"><b>Duration:</b> ${leg.duration.text}</p>
                <p class="card-text"> <b><u>Steps:</u></b>${leg.steps.map(
                    (step, index) => { return `
                        <p class="card-text"> <b> Step ${index + 1}: </b> </p>
                        <p class="card-text"> ${step.html_instructions} </p>
                        <p class="card-text"> Distance: ${step.distance.text} </p>
                        <p class="card-text"> Duration: ${step.duration.text} </p>
                    `
                    }
                )}
                </p>
            </div>
            </div>
         `;
    
}

document.getElementById('submit_path').addEventListener('click', function(e){

    e.preventDefault();
    const origin = document.getElementById('Origin').value;
    const destination = document.getElementById('Destination').value;
    const mode = document.getElementById('mode').value;

    document.getElementById('error-message').style.display = 'none';

    fetchRoutes(origin, destination, mode, currentPage, limit);
});

function fetchRoutes(origin, destination, mode){
    fetch('http://3.145.179.175:5000/routes', {
        

        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            origin: origin,
            destination: destination,
            mode: mode,
        })
    })
        .then(response => {
            if (response.status === 201){
                console.log('Resource created successfully.');
            }
            else if(response.status === 202){
                alert('Your request is being processed');
                return;
            }
            else if (response.status === 400){
                throw new Error('Invalid request: Origin and Destination are required');
            }
            else if(response.status === 404){
                throw new Error('No routes found for the given locations.');
            }
            else if(response.status === 500){
                throw new Error('Internal server error. Please try again later.');
            }
            else if(!response.ok){
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.json();
        })
        .then(data => {
            if(data.error){
                document.getElementById('error-message').style.display = 'block';
            }
            else{
                document.getElementById('path-accessible-content').style.display = 'block';
                const pathContainer = document.getElementById('path_container');
                document.getElementById('path-title').textContent = `Accessible Paths for ${origin} to ${destination} (${mode})`;
                //make button disabled
                document.getElementById('show_all').disabled = true;

                pathContainer.innerHTML = '';
                data.routes.forEach((path,index) => {
                    path.legs.forEach(leg => {
                        const pathElement = document.createElement('div');
                        pathElement.classList.add("col-md-4", "mb-3");
                        pathElement.innerHTML = `
                            <div class="card clickable-item">
                            <div class="card-body">
                                <h5 class="card-title">Route ${index + 1}: ${leg.start_address} to ${leg.end_address}</h5>
                                <p class="card-text">Click for more details</p>
                            </div>
                            </div>
                        `;


                        pathElement.addEventListener('click', () => {
                            showDetails(leg, index);
                        });
                        pathContainer.appendChild(pathElement);
                        
                    });

                });
            }
        })
        .catch(error => {
            document.getElementById('error-message').style.display = 'block';
            console.error(error);
        });
};

function handlePagination(pagination) {
    const paginationContainer = document.getElementById('pagination_container');
    paginationContainer.innerHTML = '';
    try {
    if (pagination && pagination.totalPages > 1) {
        // Previous Button
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.onclick = () => {
                currentPage--;
                fetchViewedRoutes(currentPage, limit);

            };
            paginationContainer.appendChild(prevButton);
        }

        // Next Button
        if (currentPage < pagination.totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.onclick = () => {
                currentPage++;
                fetchViewedRoutes(currentPage, limit);
            };
            paginationContainer.appendChild(nextButton);
        }
    }
} 
    catch (error) {
        console.error('Error:', error);
    }
}

function fetchViewedRoutes(currentPage, limit) {
    fetch(`http://3.145.179.175:5000/viewed_routes/page/${currentPage}?limit=${limit}`, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 201){
                console.log('Resource created successfully.');
            }
            else if(response.status === 202){
                alert('Your request is being processed');
                return;
            }
            else if (response.status === 400){
                throw new Error('Invalid request: Origin and Destination are required');
            }
            else if(response.status === 404){
                throw new Error('No routes found for the given locations.');
            }
            else if(response.status === 500){
                throw new Error('Internal server error. Please try again later.');
            }
            else if(!response.ok){
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.json();
        })
        .then(data => {
            if(data.error){
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = data.error;
            }
            else{
                document.getElementById('path-accessible-content').style.display = 'block';
                document.getElementById('path-title').textContent = `Viewed Routes`;
                document.getElementById('submit_path').disabled = true;

                const pathContainer = document.getElementById('path_container');
                pathContainer.innerHTML = '';
                window.history.replaceState({}, '', `/#/viewed_routes/page/${currentPage}`);
                data.routes.forEach((path,index) => {
                  
                        const pathElement = document.createElement('div');
                        pathElement.classList.add("col-md-4", "mb-3");
                        pathElement.innerHTML = `
                            <div class="card item">
                            <div class="card-body">
                                <h5 class="card-title">Route ${currentPage * limit - limit + index + 1}: ${path.origin} to ${path.destination}</h5>: ${path.origin} to ${path.destination}</h5>
                            </div>
                            </div>
                        `;

                        pathContainer.appendChild(pathElement);
                        
              

                });

                handlePagination(data.pagination);
            }
        })
        .catch(error => {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = 'Error: Could not find routes you viewed.';
            console.error(error);
        });

}

document.getElementById('show_all').addEventListener('click', function(e){

    e.preventDefault();

    fetchViewedRoutes(currentPage, limit);
});

document.addEventListener('DOMContentLoaded', function() {
    window.history.replaceState({}, '', `/`);
    const defaultStation = '74 St-Broadway';
    fetchMTAAlerts(defaultStation);
    
});