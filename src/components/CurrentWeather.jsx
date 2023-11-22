import React from "react";
import { useState } from "react";
import "../styles/currentWeather.css";
import { dateTimeFormate, timeFormate } from "../utils/DateTimeFormat"; // created a file to format the date and time
import direction from "../assets/direction.png";
import { getWeatherImgUrl, getWeatherWithCityName } from "../API/ApiHelper";
import { setCache, getCache } from "../data/cacheData";
import {
  PH_CITY_SEARCH,
  ERROR_INPUT_MESSAGE,
  DEFAULT_INPUT_MESSAGE,
} from "../data/constants";

function WeatherSearch() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const searchLocation = async () => {
    if (!location.trim()) {
      setMessage(true);
      return null;
    }

    const cachedData = getCache(location);
    if (cachedData) {
      setData(cachedData);
      // Clear the input field
      setLocation("");
      return;
    }

    try {
      // Getting data from the API
      const weatherData = await getWeatherWithCityName(location); // using APIhelper to fetch weather data
      setData(weatherData);
      setCache(location, weatherData);
      setLocation("");
      setSearchError(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setSearchError(true);
    } finally {
      setMessage(false);
    }
  };

  const handleKeyPress = (event) => {
    // handling key press
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
    setMessage(false);
    setSearchError(false);
  };

  return (
    <div className="weatherCards">
      {/*Rendering input field and add button*/}
      <div className="search">
        <input
          id="loaction-input"
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder={PH_CITY_SEARCH}
          onKeyPress={handleKeyPress}
          name="locationName"
          required
        />
        <button onClick={searchLocation} value="Clicked">
          Add City
        </button>
      </div>
      {message ? (
        <div className="input-message">
          <p id="message-content">{DEFAULT_INPUT_MESSAGE}</p>
        </div>
      ) : null}
      {searchError ? (
        <div className="input-message">
          <p id="message-content">{ERROR_INPUT_MESSAGE}</p>
        </div>
      ) : null}
      {/*checking if the data is available in the state var and rendering the data*/}
      {data.name ? (
        <div className="full-page-weather">
          <div className="full-page-top">
            {data.main ? (
              <h2>
                {" "}
                {data.name},{data.sys.country}{" "}
              </h2>
            ) : null}{" "}
            {data.dt ? <p> Updated on {dateTimeFormate(data.dt)}</p> : null}
          </div>
          <div className="full-page-description">
            {data.weather ? (
              <img alt="weather" src={getWeatherImgUrl(data.weather[0].icon)} />
            ) : null}
            {data.weather ? (
              <div className="full-page-descript">
                <p>{data.weather[0].description}</p>
              </div>
            ) : null}
          </div>
          <div className="full-page-temp">
            <div className="full-main-temp">
              {data.main ? (
                <p className="current-temp">{Math.floor(data.main.temp)}°C</p>
              ) : null}
            </div>

            {data.main ? (
              <p className="full-page-text-maxmin-temp">
                {" "}
                Temp Min: {Math.floor(data.main.temp_min)}°C
              </p>
            ) : null}
            {data.main ? (
              <p> Temp Max: {Math.floor(data.main.temp_max)}°C</p>
            ) : null}
          </div>
          <div className="full-page-bottom">
            <div className="full-page-bottom-left">
              {data.main ? (
                <p>
                  {" "}
                  <strong>Pressure:</strong> {data.main.pressure} hPa{" "}
                </p>
              ) : null}
              {data.main ? (
                <p>
                  {" "}
                  <strong>Humidity: </strong>
                  {data.main.humidity} %{" "}
                </p>
              ) : null}
              {data.visibility ? (
                <p>
                  {" "}
                  <strong>Visibility:</strong>{" "}
                  {(data.visibility / 1000).toFixed(1)} km{" "}
                </p>
              ) : null}
            </div>
            <div className="full-page-bottom-mid">
              <img src={direction} alt="direction"></img>
              {data.wind ? (
                <p>
                  {data.wind.speed}m/s {data.wind.deg}° degree
                </p>
              ) : null}
            </div>
            <div className="full-page-bottom-right">
              {data.sys ? (
                <p>
                  <strong>Sunrise:</strong>
                  {timeFormate(data.sys.sunrise)}
                </p>
              ) : null}
              {data.sys ? (
                <p>
                  <strong>Sunset:</strong>
                  {timeFormate(data.sys.sunset)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherSearch;
