import React from "react";
import axios from "axios";
import { useState } from "react";
import { dateTimeFormate, timeFormate } from "./DateTimeFormat"; // created a file to format the date and time
import direction from "../assets/direction.png";

function WeatherSearch() {
  // creating state variables to set the data from API and cityName from the input text
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // setting the url by including city name from the input to fetch data from API
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=ad49549df2c915adda51917a2382f0aa&units=metric";

  const searchLocation = () => {
    //  A method is created to rerive data from API once you Enter the cityName and press Enter Or press Add city Button
    console.log("fetching data from API...");
    axios.get(url).then((response) => {
      setData(response.data);
    });
    setLocation("");
  };

  const handleKeyPress = (event) => {
    // handling key press
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div
      className="weatherCards"
      style={{ paddingBottom: "20px", textAlign: "center" }}>
      {/*Rendering input field and add button*/}
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter a city name to see current weather"
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
              <h2 style={{ fontSize: "4vw" }}>
                {" "}
                {data.name},{data.sys.country}{" "}
              </h2>
            ) : null}{" "}
            {data.dt ? (
              <p style={{ fontSize: "1.3vw" }}>
                {" "}
                Updated on {dateTimeFormate(data.dt)}
              </p>
            ) : null}
          </div>
          <div className="full-page-description">
            {data.weather ? (
              <img
                alt="weather"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                style={{}}
              />
            ) : null}
            {data.weather ? (
              <p
                className="descript"
                style={{
                  fontSize: "2vw",
                  textShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.5)",
                }}>
                {data.weather[0].description}
              </p>
            ) : null}
          </div>
          <div className="full-page-temp">
            {data.main ? (
              <p style={{ fontSize: "8vw" }}>{Math.floor(data.main.temp)}°C</p>
            ) : null}
            {data.main ? (
              <p style={{ fontSize: "1.8vw" }}>
                {" "}
                Temp Min: {Math.floor(data.main.temp_min)}°C
              </p>
            ) : null}
            {data.main ? (
              <p style={{ fontSize: "1.8vw" }}>
                {" "}
                Temp Max: {Math.floor(data.main.temp_max)}°C
              </p>
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
              <img
                src={direction}
                alt="direction"
                style={{ width: "1.5vw" }}></img>
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
