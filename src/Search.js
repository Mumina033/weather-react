import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  function generateRandomForecast() {
    const icons = [
      "01d",
      "02d",
      "03d",
      "04d",
      "09d",
      "10d",
      "11d",
      "13d",
      "50d",
      "01n",
      "02n",
      "03n",
      "04n",
      "09n",
      "10n",
      "11n",
      "13n",
      "50n",
    ];

    const randomIcons = icons.sort(() => 0.5 - Math.random()).slice(0, 5);
    return randomIcons.map(
      (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
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

    setForecast(generateRandomForecast());
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

    let apiKey = "d1a86552de255334f6117b348c4519bd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("API URL:", apiUrl);
    axios.get(apiUrl).then(displayWeather).catch(handleError);
  }

  function capitalizeCityName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function updateCity(event) {
    let input = event.target.value;
    let capitalizedInput = capitalizeCityName(input);
    setCity(capitalizedInput);
  }

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

  let dailyForecast = (
    <div className="container">
      <div className="row">
        {["Mon", "Tues", "Wens", "Thurs", "Fri"].map((day, index) => (
          <div className="col-md" key={index}>
            <div className="forecast-day">{day}</div>
            <div className="forecast-content">
              <div className="forecast-img">
                <img src={forecast[index]} alt={`Forecast for ${day}`} />
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
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div className="col-6">
          <h2>{city}</h2>
          Friday 3:57 AM, {weather.description}
          <p className="weather-info">
            Humidity: <span className="highlight">{weather.humidity}% </span>,
            Wind:{" "}
            <span className="highlight">{Math.round(weather.wind)} mph</span>
          </p>
        </div>
        <div className="col-8">
          <h1 className="initialtemp">
            <img src={weather.icon} alt={weather.description} />{" "}
            {Math.round(weather.temperature)}°C
          </h1>
        </div>
        {dailyForecast}
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
