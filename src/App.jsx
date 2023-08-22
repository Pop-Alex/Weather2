import React, { useContext, useState } from "react";
import "boxicons";
import ReactSwitch from "react-switch";
import { WeatherContext } from "./context";
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const App = () => {
  const {
    handleSearchSubmit,
    searchLocation,
    weatherData,
    currLocation,
    setSearchLocation,
    theme,
    toggleTheme,
  } = useContext(WeatherContext);
  const dayWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayWeek)
  );

  const dateBuilder = (d) => {
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="main" id={theme}>
      <div className="switch">
        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
      <div className="container">
        <div className="left-side">
          <div className="today">
            {weatherData && (
              <div className="today-location">
                <h3>{dateBuilder(new Date())}</h3>
                <box-icon name="current-location"></box-icon>
                {weatherData ? <span>{weatherData.location.name}</span> : null}
                {weatherData ? (
                  <span>{weatherData.location.country}</span>
                ) : null}
              </div>
            )}
          </div>
          <div className="today-weather">
            {weatherData ? (
              <img src={weatherData.current.condition.icon} alt="" />
            ) : null}

            {weatherData ? (
              <h1>{weatherData.current.temp_c.toFixed()}°C</h1>
            ) : null}
            {weatherData ? <h3>{weatherData.current.condition.text}</h3> : null}
          </div>
        </div>

        <div className="right-side">
          <div className="search">
            <form action="" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </form>
          </div>
          <div className="forecast">
            {weatherData.forecast?.forecastday.map((fore, idx) => {
              return (
                <li key={idx}>
                  <box-icon name="sun"></box-icon>
                  <span>{forecastDays[idx]}</span>
                  <span>{`${fore.day.maxtemp_c.toFixed()}°C`}</span>
                </li>
              );
            })}
          </div>

          <div className="day-detail">
            <div>
              <span className="title-day">Feels Like</span>
              {weatherData ? (
                <span className="value">{weatherData.current.feelslike_c}</span>
              ) : null}
            </div>
            <div>
              <span className="title-day">Humidity</span>
              {weatherData ? (
                <span className="value"> {weatherData.current.humidity}%</span>
              ) : null}
            </div>
            <div>
              <span className="title-day">Wind</span>
              {weatherData ? (
                <span className="value">{weatherData.current.wind_mph}mph</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="powered">
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </div>
    </div>
  );
};

export default App;
