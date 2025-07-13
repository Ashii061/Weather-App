const apiKey = config.apiKey;
const apiUrl = config.apiUrl;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const tempText = document.querySelector(".temp");
const cityText = document.querySelector(".city");
const humidityText = document.querySelector(".humidity");
const windText = document.querySelector(".wind");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update UI
    cityText.innerText = data.name;
    tempText.innerText = `${Math.round(data.main.temp)}°C`;
    humidityText.innerText = `${data.main.humidity}%`;
    windText.innerText = `${data.wind.speed} km/h`;

    // Change icon based on weather
    const weather = data.weather[0].main;
    switch (weather) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      default:
        weatherIcon.src = "images/weather.png";
    }

  } catch (error) {
    alert("❌ " + error.message);
  }
}

// Handle search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});

    