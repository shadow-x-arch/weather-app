const apiKey: string = '9bd08310d1fb4c85a0c84028240612';

function getWeather(): void {
    const cityInput = document.getElementById('city') as HTMLInputElement | null;

    if (!cityInput || !cityInput.value.trim()) {
        alert('Please enter a city name.');
        return;
    }

    const city: string = cityInput.value.trim();
    const apiURL: string = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiURL)
        .then((response: Response) => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(`Network response was not ok: ${err.error.message}`);
                });
            }
            return response.json();
        })
        .then((data: any) => {
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const descriptionElement = document.getElementById('description');
            const humidityElement = document.getElementById('humidity');
            const windElement = document.getElementById('wind');
            const iconElement = document.getElementById('icon');
            const weatherInfoElement = document.querySelector('.weather-info') as HTMLElement | null;

            if (locationElement) locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            if (temperatureElement) temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
            if (descriptionElement) descriptionElement.textContent = `Condition: ${data.current.condition.text}`;
            if (humidityElement) humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
            if (windElement) windElement.textContent = `Wind: ${data.current.wind_kph} km/h`;

            const condition: string = data.current.condition.text.toLowerCase();
            let icon: string;
            if (condition.indexOf('sunny') !== -1 || condition.indexOf('clear') !== -1) {
                icon = '☀️';
            } else if (condition.indexOf('cloudy') !== -1) {
                icon = '☁️';
            } else if (condition.indexOf('rain') !== -1) {
                icon = '🌧️';
            } else if (condition.indexOf('thunder') !== -1) {
                icon = '⛈️';
            } else if (condition.indexOf('snow') !== -1) {
                icon = '❄️';
            } else {
                icon = '🌡️';
            }
            if (iconElement) iconElement.textContent = icon;
            if (weatherInfoElement) weatherInfoElement.style.display = 'block';
        })
        .catch((error: Error) => {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            alert(`"${city}" make sure it is well spelled or an actual city`);
        });
}

export default getWeather;
