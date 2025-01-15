const { getByText, getByPlaceholderText, fireEvent } = require('@testing-library/dom');
const { toBeInTheDocument } = require('@testing-library/jest-dom/matchers');
expect.extend({ toBeInTheDocument });

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      location: { name: 'Paris', country: 'France' },
      current: { temp_c: 15, condition: { text: 'Sunny' }, humidity: 55, wind_kph: 10 }
    })
  })
);

// Define the getWeather function globally
global.getWeather = function() {
  const apiKey = '9bd08310d1fb4c85a0c84028240612';
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
      alert(`"${city}" make sure it is well-spelled or an actual city`);
    });
};

// Set up the DOM
document.body.innerHTML = `
  <div>
    <input id="city" placeholder="Enter city name" />
    <button onclick="getWeather()">Get Weather</button>
    <h2 id="location"></h2>
    <p id="temperature"></p>
    <p id="description"></p>
    <p id="humidity"></p>
    <p id="wind"></p>
    <div id="icon"></div>
  </div>
`;

test('UI updates with weather data on clicking Get Weather button', () => {
  const input = getByPlaceholderText(document.body, 'Enter city name');
  const button = getByText(document.body, 'Get Weather');

  fireEvent.change(input, { target: { value: 'Paris' } });
  fireEvent.click(button);

  setTimeout(() => {
    expect(getByText(document.body, 'Paris, France')).toBeInTheDocument();
    expect(getByText(document.body, 'Temperature: 15°C')).toBeInTheDocument();
    expect(getByText(document.body, 'Condition: Sunny')).toBeInTheDocument();
    expect(getByText(document.body, 'Humidity: 55%')).toBeInTheDocument();
    expect(getByText(document.body, 'Wind: 10 km/h')).toBeInTheDocument();
    expect(getByText(document.body, '☀️')).toBeInTheDocument();
  }, 0);
});
