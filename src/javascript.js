// Time and Date

let now = new Date();

let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day} ${month} ${date}, ${year}<br /> at ${hours}:${minutes}`;

// Format Time for Forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Search
// Current Weather
// Change emoji

function showWeather(response) {
  // Celcius Temperature Variable
  celsiusTemperature = response.data.main.temp;

  // City
  document.querySelector(".maincity").innerHTML = response.data.name;
  // Temperature
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  // Description
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  // Wind Speed
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  // Humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  // Emojis
  let emoji = document.querySelector("#currentemoji");
  let image = weather[0].icon;
  emoji.setAttribute("src", `http://openweathermap.org/img/wn/${image}.png`);
  emoji.setAttribute("alt", response.data.weather[0].description);
}

//API

// Forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#futuretemperature");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    let image = forecast.weather[0].icon;
    forecastElement.innerHTML += `<p class="futuretemp">
              <span id="futuretemperature">${Math.round(
                forecast.main.temp
              )}°C <img id="futuretemp" src="http://openweathermap.org/img/wn/${image}.png"></span> at
              <span class="time">
               ${formatHours(forecast.dt * 1000)}
              </span></p>`;
  }
}

// City Search
function searchCity(city) {
  let units = "metric";
  let apiKey = "82748eb647aa94c9acf7aa6a08000727";
  // Weather
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
  // Forecast
  let ApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(ApiURL).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityinput").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Current Location
function searchLocation(position) {
  let units = "metric";
  let apiKey = "82748eb647aa94c9acf7aa6a08000727";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
}

function currentLocationButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationPress = document.querySelector("#getcurrentcity");
currentLocationPress.addEventListener("click", currentLocationButton);

// Degrees Change

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let convertToFTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(convertToFTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("a#degrees-f");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("a#degrees-c");
celsiusLink.addEventListener("click", convertToCelsius);

// On load
searchCity("Vancouver");
