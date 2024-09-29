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

document.getElementById('find_a_path').addEventListener('submit', function(e){
    e.preventDefault();
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    document.getElementById('error-message').style.display = 'none';

    fetch('/find-route', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({start, end})
    })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                document.getElementById('error-message').style.display = 'block';
            }
            else{
                alert('Success! Accessible route found!');
            }
        })
        .catch(error => {
            document.getElementById('error-message').style.display = 'block';
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const defaultStation = '74 St-Broadway';
    fetchMTAAlerts(defaultStation);
});