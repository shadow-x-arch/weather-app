"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiKey = '9bd08310d1fb4c85a0c84028240612';
function getWeather() {
    var cityInput = document.getElementById('city');
    if (!cityInput || !cityInput.value.trim()) {
        alert('Please enter a city name.');
        return;
    }
    var city = cityInput.value.trim();
    var apiURL = "https://api.weatherapi.com/v1/current.json?key=".concat(apiKey, "&q=").concat(city, "&aqi=no");
    fetch(apiURL)
        .then(function (response) {
        if (!response.ok) {
            return response.json().then(function (err) {
                throw new Error("Network response was not ok: ".concat(err.error.message));
            });
        }
        return response.json();
    })
        .then(function (data) {
        var locationElement = document.getElementById('location');
        var temperatureElement = document.getElementById('temperature');
        var descriptionElement = document.getElementById('description');
        var humidityElement = document.getElementById('humidity');
        var windElement = document.getElementById('wind');
        var iconElement = document.getElementById('icon');
        var weatherInfoElement = document.querySelector('.weather-info');
        if (locationElement)
            locationElement.textContent = "".concat(data.location.name, ", ").concat(data.location.country);
        if (temperatureElement)
            temperatureElement.textContent = "Temperature: ".concat(data.current.temp_c, "\u00B0C");
        if (descriptionElement)
            descriptionElement.textContent = "Condition: ".concat(data.current.condition.text);
        if (humidityElement)
            humidityElement.textContent = "Humidity: ".concat(data.current.humidity, "%");
        if (windElement)
            windElement.textContent = "Wind: ".concat(data.current.wind_kph, " km/h");
        var condition = data.current.condition.text.toLowerCase();
        var icon;
        if (condition.indexOf('sunny') !== -1 || condition.indexOf('clear') !== -1) {
            icon = '☀️';
        }
        else if (condition.indexOf('cloudy') !== -1) {
            icon = '☁️';
        }
        else if (condition.indexOf('rain') !== -1) {
            icon = '🌧️';
        }
        else if (condition.indexOf('thunder') !== -1) {
            icon = '⛈️';
        }
        else if (condition.indexOf('snow') !== -1) {
            icon = '❄️';
        }
        else {
            icon = '🌡️';
        }
        if (iconElement)
            iconElement.textContent = icon;
        if (weatherInfoElement)
            weatherInfoElement.style.display = 'block';
    })
        .catch(function (error) {
        console.error("There was a problem with the fetch operation: ".concat(error.message));
        alert("\"".concat(city, "\" make sure it is well spelled or an actual city"));
    });
}
exports.default = getWeather;
