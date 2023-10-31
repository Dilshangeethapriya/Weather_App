import { useEffect, useState } from "react";
import axios from "axios";
import direction from "../assets/direction.png";
import { getCache, setCache, getExpiration } from "./cache"; // created a file to save cache data
import { dateTimeFormate, timeFormate } from "./DateTimeFormat"; // created a file to format the date and time

function CitiesWeather(props) {
  // main function and a prop to recieve the Citicode
  const { cityCode } = props;

  const [cachedData, setCachedData] = useState(); // creating a usestate variable to set cached data

  useEffect(() => {
    // Check whether the data is cached or not
    const cachedData = getCache(cityCode);
    const expirationTime = getExpiration(cityCode);

    // If there is no data , fetch it from the API
    if (!cachedData || expirationTime < Date.now()) {
      console.log("fetching data from API..");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=ad49549df2c915adda51917a2382f0aa&units=metric`
        )
        .then((response) => {
          // Set API data to state variable
          setCachedData(response.data);

          // Storing or Updating(if the cache with the corresponded key is expired) the cached data and the expiration time in the cache
          setCache(cityCode, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Use the cached data and svae it to state variable
      console.log("fetching data from cache..");
      setCachedData(cachedData);
    }
  }, [cityCode]);

  return (
    <div>
      {cachedData ? (
        <div className="cards two-part-container">
          <div className="top-part">
            {/*top table for city,country,date, temp and weather description*/}
            <div className="city-and-time">
              {cachedData.main ? (
                <h2 style={{ fontSize: "2.3vw" }}>
                  {" "}
                  {cachedData.name},{cachedData.sys.country}{" "}
                </h2>
              ) : null}{" "}
              <p>{dateTimeFormate(cachedData.dt)}</p>{" "}
            </div>
            <div className="current-temp">
              {cachedData.main ? (
                <p style={{ fontSize: "5vw" }}>
                  {Math.floor(cachedData.main.temp)}°C
                </p>
              ) : null}
            </div>
            <div className="wether-description">
              {cachedData.weather ? (
                <img
                  alt="weather"
                  src={`https://openweathermap.org/img/wn/${cachedData.weather[0].icon}@2x.png`}
                  style={{ flex: "1", width: "2vw" }}
                />
              ) : null}{" "}
              {/*weather description icon from openweatherAPI*/}
              {cachedData.weather ? (
                <p
                  className="descript"
                  style={{
                    marginTop: "1vw",
                    flex: "2",
                    fontSize: "1.3vw",
                    float: "left",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                  }}>
                  {cachedData.weather[0].description}
                </p>
              ) : null}
            </div>
            <div className="max-min-temp">
              {cachedData.main ? (
                <p style={{ fontSize: "1.2vw" }}>
                  {" "}
                  Temp Min: {Math.floor(cachedData.main.temp_min)}°C
                </p>
              ) : null}
              {cachedData.main ? (
                <p style={{ fontSize: "1vw" }}>
                  {" "}
                  Temp Max: {Math.floor(cachedData.main.temp_max)}°C
                </p>
              ) : null}
            </div>
          </div>
          <div className="bottom-part">
            {/* Bottom table for perssure,humidity,wind sunrise and sunset */}

            <div className="pressure-hum-visibility">
              {cachedData.main ? (
                <p style={{ fontSize: "1vw" }}>
                  {" "}
                  <strong>Pressure:</strong> {cachedData.main.pressure} hPa{" "}
                </p>
              ) : null}
              {cachedData.main ? (
                <p style={{ fontSize: "1vw" }}>
                  {" "}
                  <strong>Humidity: </strong>
                  {cachedData.main.humidity} %{" "}
                </p>
              ) : null}
              {cachedData.visibility ? (
                <p style={{ fontSize: "1vw" }}>
                  {" "}
                  <strong>Visibility:</strong>{" "}
                  {(cachedData.visibility / 1000).toFixed(1)} km{" "}
                </p>
              ) : null}
            </div>
            <div
              className="wind-speed"
              style={{
                borderLeft: "0.1vw solid white",
                borderRight: "0.1vw solid white",
              }}>
              <img
                src={direction}
                alt="direction"
                style={{ width: "1.5vw" }}></img>
              {cachedData.wind ? (
                <p style={{ fontSize: "1vw" }}>
                  {cachedData.wind.speed}m/s {cachedData.wind.deg}° degree
                </p>
              ) : null}
            </div>
            <div className="sunrise-sunset">
              {cachedData.sys ? (
                <p style={{ fontSize: "1vw" }}>
                  <strong>Sunrise:</strong>
                  {timeFormate(cachedData.sys.sunrise)}
                </p>
              ) : null}
              {cachedData.sys ? (
                <p style={{ fontSize: "1vw" }}>
                  <strong>Sunset:</strong>
                  {timeFormate(cachedData.sys.sunset)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CitiesWeather;
