const apiKey = '9bd08310d1fb4c85a0c84028240612';

function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
            document.getElementById('description').textContent = `Condition: ${data.current.condition.text}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
            document.getElementById('wind').textContent = `Wind: ${data.current.wind_kph} km/h`;

            const condition = data.current.condition.text.toLowerCase();
            let icon;
            if (condition.includes('sunny') || condition.includes('clear')) {
                icon = '☀️';
            } else if (condition.includes('cloudy')) {
                icon = '☁️';
            } else if (condition.includes('rain')) {
                icon = '🌧️';
            } else if (condition.includes('thunder')) {
                icon = '⛈️';
            } else if (condition.includes('snow')) {
                icon = '❄️';
            } else {
                icon = '🌡️';
            }
            document.getElementById('icon').textContent = icon;
            document.querySelector('.weather-info').style.display = 'block';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            
        });
}

module.exports = getWeather;
