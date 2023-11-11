import TitleBar from "../components/TitleBar.jsx";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/currentWeather.css";
import { useEffect, useState } from "react";
import { dateTimeFormate, timeFormate } from "../utils/DateTimeFormat";
import direction from "../assets/direction.png";
import { getUrlWithId, getWeatherImgUrl } from "../API/apiUrl";
import { setCache, getCache } from "../data/cacheData";
import "../styles/SecondPAge.css";

function WeatherInfo() {
  const { id } = useParams();
  // main function and a prop to recieve the Citicode
  const [data, setData] = useState(); // creating a usestate variable to set cached data

  useEffect(() => {
    // Check whether the data is cached or not
    const data = getCache(id);

    // Check whether the data is cached or not
    if (data) {
      // Use the cached data and svae it to state variable
      setData(data);
    } else {
      // If there is no data or data is expired, fetch it from the API

      axios
        .get(getUrlWithId(id))
        .then((response) => {
          // Set API data to state variable
          setData(response.data);

          // Storing or Updating(if the cache with the corresponded key is expired) the cached data and the expiration time in the cache
          setCache(id, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  //console.log("second page data = " + data.name);

  return (
    <div className="secon-page">
      <div className="second-page">
        <div className="cont-hght-10vw">
          <TitleBar></TitleBar>
        </div>
        <div className="Spacer"></div>
        {data ? (
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
                <img
                  alt="weather"
                  src={getWeatherImgUrl(data.weather[0].icon)}
                />
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
      <Footer></Footer>
    </div>
  );
}

export default WeatherInfo;
