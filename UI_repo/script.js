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
