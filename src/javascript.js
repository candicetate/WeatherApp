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

h3.innerHTML = `${day} ${month} ${date}, ${year} at ${hours}:${minutes}`;

// Degrees Change

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 24;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("a.degrees-f");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("a.degrees-c");
celsiusLink.addEventListener("click", convertToCelsius);

// Search
// Current Weather
// Change emoji

function showWeather(response) {
  // City
  document.querySelector(".maincity").innerHTML = response.data.name;
  // Temperature
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // Description
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  // Emojis
  let emojiDescription = response.data.weather[0].id;
  let emoji = document.querySelector("#currentemoji");
  // Thunderstorm
  if (emojiDescription <= 232) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/11d.png">`;
  }
  // Rain
  if (emojiDescription >= Math.max(232) && emojiDescription < Math.min(531)) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/09d.png">`;
  }
  // Snow
  if (emojiDescription >= Math.max(600) && emojiDescription < Math.min(622)) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/13d.png">`;
  }
  // Fog
  if (emojiDescription === 741) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/50d.png">`;
  }
  // Clear
  if (emojiDescription === 800) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/01d.png">`;
  }
  // Cloudy
  if (emojiDescription > 800) {
    emoji.innerHTML = `<img src=\"http://openweathermap.org/img/wn/03d.png">`;
  }
}

//API
function searchCity(city) {
  let units = "metric";
  let apiKey = "82748eb647aa94c9acf7aa6a08000727";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
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

// On load

searchCity("Vancouver");
