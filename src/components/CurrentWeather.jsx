import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/currentWeather.css";
import { dateTimeFormate, timeFormate } from "../utils/DateTimeFormat"; // created a file to format the date and time
import direction from "../assets/direction.png";
import { getUrlWithName, getWeatherImgUrl } from "../API/apiUrl";
import { setCache, getCache } from "../data/cacheData";
import { PH_CITY_SEARCH } from "../data/constants";

function WeatherSearch() {
  // creating state variables to set the data from API and cityName from the input text
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // setting the url by including city name from the input to fetch data from API

  const searchLocation = () => {
    // Getting data from cache if valid cache is present local storage
    const cachedData = getCache(location);

    if (cachedData) {
      setData(cachedData);
      console.log();
    } else {
      //  A method is created to rerive data from API once you Enter the cityName and press Enter Or press Add city Button
      axios
        .get(getUrlWithName(location))
        .then((response) => {
          setData(response.data);
          console.log();
          // storing data in a cache in Local storage
          setCache(location, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLocation("");
  };

  const handleKeyPress = (event) => {
    // handling key press
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div className="weatherCards">
      {/*Rendering input field and add button*/}
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder={PH_CITY_SEARCH}
          onKeyPress={handleKeyPress}
          name="locationName"
        />
        <button onClick={searchLocation} value="Clicked">
          Add City
        </button>
      </div>
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
