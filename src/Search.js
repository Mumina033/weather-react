import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("New Orleans");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather("New Orleans");
  }, []);

  function fetchWeather(city) {
    let apiKey = "d1a86552de255334f6117b348c4519bd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather).catch(handleError);
  }

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleError(error) {
    console.error("Error fetching the weather data:", error);
    alert(
      "Failed to fetch weather data. Please check the city name and try again."
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    fetchWeather(city);
  }

  function updateCity(event) {
    let input = event.target.value;
    let capitalizedInput = capitalizeCityName(input);
    setCity(capitalizedInput);
  }

  function capitalizeCityName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function getRandomForecastImages() {
    const imageUrls = [
      "https://openweathermap.org/img/wn/01d@2x.png",
      "https://openweathermap.org/img/wn/02d@2x.png",
      "https://openweathermap.org/img/wn/03d@2x.png",
      "https://openweathermap.org/img/wn/04d@2x.png",
      "https://openweathermap.org/img/wn/09d@2x.png",
      "https://openweathermap.org/img/wn/10d@2x.png",
      "https://openweathermap.org/img/wn/11d@2x.png",
      "https://openweathermap.org/img/wn/13d@2x.png",
      "https://openweathermap.org/img/wn/50d@2x.png",
    ];

    for (let i = imageUrls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
    }

    return imageUrls.slice(0, 5);
  }

  const forecastImages = getRandomForecastImages();

  let form = (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="search"
          placeholder="Enter a city"
          onChange={updateCity}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );

  let dailyForecast = weather ? (
    <div className="container">
      <div className="row">
        {forecastImages.map((image, index) => (
          <div className="col-md" key={index}>
            <div className="forecast-day">Day {index + 1}</div>
            <div className="forecast-content">
              <div className="forecast-img">
                <img src={image} alt={`Forecast ${index + 1}`} />
              </div>
              <div className="forecast-max-min">
                <span className="forecast-max">34°</span>
                <span className="forecast-min">23°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer-css">
        This project was coded by{" "}
        <a
          href="https://github.com/Mumina033"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mumina Mohamed
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/Mumina033/weather-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        and hosted on{" "}
        <a
          href="https://keen-blini-eff8a2.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </footer>
    </div>
  ) : null;

  return (
    <div>
      {form}
      <div className="col-6">
        <h2>{city}</h2>
        {weather ? (
          <>
            Friday 3:57 AM, {weather.description}
            <p className="weather-info">
              Humidity: {weather.humidity}%, Wind: {weather.wind} mph
            </p>
          </>
        ) : null}
      </div>
      <div className="col-8">
        {weather ? (
          <h1 className="initialtemp">
            <img src={weather.icon} alt={weather.description} />{" "}
            {Math.round(weather.temperature)}°C
          </h1>
        ) : null}
      </div>
      {dailyForecast}
    </div>
  );
}
