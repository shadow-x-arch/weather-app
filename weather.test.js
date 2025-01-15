// weather.test.js
const getWeather = require('./weather-app');

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

test('getWeather function fetches and displays weather data', () => {
  document.body.innerHTML = `
    <div>
      <input id="city" value="Paris"/>
      <h2 id="location"></h2>
      <p id="temperature"></p>
      <p id="description"></p>
      <p id="humidity"></p>
      <p id="wind"></p>
      <div id="icon"></div>
    </div>
  `;

  getWeather();

  // Simulate successful response
  setTimeout(() => {
    expect(document.getElementById('location').textContent).toBe('Paris, France');
    expect(document.getElementById('temperature').textContent).toBe('Temperature: 15°C');
    expect(document.getElementById('description').textContent).toBe('Condition: Sunny');
    expect(document.getElementById('humidity').textContent).toBe('Humidity: 55%');
    expect(document.getElementById('wind').textContent).toBe('Wind: 10 km/h');
    expect(document.getElementById('icon').textContent).toBe('☀️');
  }, 0);
});
