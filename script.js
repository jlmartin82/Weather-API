



// API key for accessing weather data
const apiKey = '5bae2a16c379685ad883d85bd03b0d53';

// Function to fetch weather data for a given city
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Function to fetch forecast data for a given city
async function getForecastData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Function to display current weather data
function displayCurrentWeather(data) {
  const { name, main, wind, weather } = data;
  const date = new Date().toLocaleDateString();

  const weatherIcon = weather[0].icon;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  const currentWeather = document.getElementById('current-weather');
  currentWeather.innerHTML = `
    <div class="weather-card">
      <h2>${name} - ${date}</h2>
      <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${temperature} &#8451;</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    </div>
  `;
}

// Function to display forecast data
function displayForecast(data) {
  const forecast = document.getElementById('forecast');
  forecast.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) {
    const { dt, main, wind, weather } = data.list[i];
    const date = new Date(dt * 1000).toLocaleDateString();
    const weatherIcon = weather[0].icon;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    const forecastCard = document.createElement('div');
    forecastCard.classList.add('weather-card');
    forecastCard.innerHTML = `
      <h3>${date}</h3>
      <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${temperature} &#8451;</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    forecast.appendChild(forecastCard);
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (city) {
    getWeatherData(city)
      .then((data) => {
        displayCurrentWeather(data);
        return getForecastData(city);
      })
      .then((data) => {
        displayForecast(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    cityInput.value = '';
  }
}

// Event listener for form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleFormSubmit);
const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()