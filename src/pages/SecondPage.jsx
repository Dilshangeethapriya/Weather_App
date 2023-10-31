import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCache, setCache, getExpiration } from "../components/cache";
import { dateTimeFormate, timeFormate } from "../components/DateTimeFormat";
import direction from "../assets/direction.png";

function WeatherInfo() {
  const { id } = useParams();
  // main function and a prop to recieve the Citicode

  const [data, setData] = useState(); // creating a usestate variable to set cached data

  useEffect(() => {
    // Check whether the data is cached or not
    const data = getCache(id);
    const expirationTime = getExpiration(id);

    // If there is no data , fetch it from the API
    if (!data || expirationTime < Date.now()) {
      console.log("fetching data from API..");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=ad49549df2c915adda51917a2382f0aa&units=metric`
        )
        .then((response) => {
          // Set API data to state variable
          setData(response.data);

          // Storing or Updating(if the cache with the corresponded key is expired) the cached data and the expiration time in the cache
          setCache(id, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Use the cached data and svae it to state variable
      console.log("fetching data from cache..");
      setData(data);
    }
  }, [id]);

  //console.log("second page data = " + data.name);

  return (
    <div className="second-page">
      <div style={{ height: "10vw" }}>
        <Link to="/" style={{ textDecorationLine: "none", color: "white" }}>
          <div className="titleBar">
            <img
              src={Logo}
              alt="logo"
              style={{
                display: "inline",
                marginRight: "2vw",
                width: "3vw",
                textDecoration: "none",
              }}
            />
            <p style={{ display: "inline" }}>Weather App</p>
          </div>
        </Link>
      </div>

      {data ? (
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
              <h1 style={{ fontSize: "8vw" }}>
                {Math.floor(data.main.temp)}°C
              </h1>
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
      <div className="footer-container">
        <div className="page-footer">2023 Dilshan Geethapriya</div>
      </div>
    </div>
  );
}

export default WeatherInfo;
