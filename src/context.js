import React, { Component, createContext, useEffect, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const ContextProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [currLocation, setCurrLocation] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const fetchApi = (location) => {
    fetch(
      ` https://api.weatherapi.com/v1/forecast.json?key=82a0f010528d40529a6113242233107&q=${location}&days=5`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `${latitude},${longitude}`;

      fetchApi(location);
    });
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchLocation) {
      fetchApi(searchLocation);
    }
  };

  const contextValue = {
    location,
    weatherData,
    setLocation,
    currLocation,
    handleSearchSubmit,
    setSearchLocation,
    handleSearchSubmit,
    theme,
    toggleTheme,
  };
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
