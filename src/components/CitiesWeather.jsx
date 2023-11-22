import { useEffect, useState } from "react";
import "../styles/citiesWeather.css";
import direction from "../assets/direction.png";
import { dateTimeFormate, timeFormate } from "../utils/DateTimeFormat"; // method to format the date and time
import LoadingScreen from "./LoadingScreen";
import { getWeatherImgUrl, getWeatherWithCityCode } from "../API/ApiHelper";
import { setCache, getCache } from "../data/cacheData";

function CitiesWeather(props) {
  // main function and a prop to recieve the Citicode
  const { cityCode } = props;
  const [cachedData, setCachedData] = useState(); // creating a usestate variable to set cached data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = getCache(cityCode);

        if (cachedData) {
          setCachedData(cachedData);
        } else {
          const APIdata = await getWeatherWithCityCode(cityCode);
          setCachedData(APIdata);
          setCache(cityCode, APIdata);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cityCode]);

  return (
    <div>
      {cachedData ? (
        <div className="cards two-part-container">
          <div className="top-part">
            {/*top table for city,country,date, temp and weather description*/}
            <div className="city-and-time">
              {cachedData.main ? (
                <h2 className="grid-text-city">
                  {" "}
                  {cachedData.name},{cachedData.sys.country}{" "}
                </h2>
              ) : null}{" "}
              <p className="grid-text-p">{dateTimeFormate(cachedData.dt)}</p>{" "}
            </div>
            <div className="current-temp">
              {cachedData.main ? (
                <p className="grid-text-temp">
                  {Math.floor(cachedData.main.temp)}°C
                </p>
              ) : null}
            </div>
            <div className="wether-description">
              {cachedData.weather ? (
                <img
                  className="grid-desc-img"
                  alt="weather"
                  src={getWeatherImgUrl(cachedData.weather[0].icon)}
                />
              ) : null}{" "}
              {/*weather description icon from openweatherAPI*/}
              {cachedData.weather ? (
                <p className="grid-text-desc">
                  {cachedData.weather[0].description}
                </p>
              ) : null}
            </div>
            <div className="max-min-temp">
              {cachedData.main ? (
                <p className="grid-text-p">
                  {" "}
                  Temp Min: {Math.floor(cachedData.main.temp_min)}°C
                </p>
              ) : null}
              {cachedData.main ? (
                <p className="grid-text-p">
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
                <p className="grid-text-p">
                  {" "}
                  <strong>Pressure:</strong> {cachedData.main.pressure} hPa{" "}
                </p>
              ) : null}
              {cachedData.main ? (
                <p className="grid-text-p">
                  {" "}
                  <strong>Humidity: </strong>
                  {cachedData.main.humidity} %{" "}
                </p>
              ) : null}
              {cachedData.visibility ? (
                <p className="grid-text-p">
                  {" "}
                  <strong>Visibility:</strong>{" "}
                  {(cachedData.visibility / 1000).toFixed(1)} km{" "}
                </p>
              ) : null}
            </div>
            <div className="wind-speed">
              <img
                className="grid-wind-direction-img"
                src={direction}
                alt="direction"></img>
              {cachedData.wind ? (
                <p className="grid-text-p">
                  {cachedData.wind.speed}m/s {cachedData.wind.deg}° degree
                </p>
              ) : null}
            </div>
            <div className="sunrise-sunset">
              {cachedData.sys ? (
                <p className="grid-text-p">
                  <strong>Sunrise:</strong>
                  {timeFormate(cachedData.sys.sunrise)}
                </p>
              ) : null}
              {cachedData.sys ? (
                <p className="grid-text-p">
                  <strong>Sunset:</strong>
                  {timeFormate(cachedData.sys.sunset)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  );
}

export default CitiesWeather;
