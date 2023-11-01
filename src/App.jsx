import "./App.css";
import CitiesWeather from "./components/CitiesWeather";
import WeatherSearch from "./components/CurrentWeather.jsx";
import ct from "./assets/cities.json"; // importing cities.json to the program to extract cityCodes
import Logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function App() {
  const colors = [
    // creating a color palete for the weather cards for each city
    "#00A1E4",
    "#483D8B",
    "#66CDAA",
    "#db904f",
    "#DC143C",
    "#800000",
    "#00008B",
    "#556B2F",
    "#8B008B",
    "#2F4F4F",
    "#191970",
  ];

  return (
    <div className="app">
      {/*rendering the title bar on the top*/}
      <div className="titleBar">
        <img
          src={Logo}
          alt="logo"
          style={{ display: "inline", marginRight: "2vw", width: "3vw" }}
        />
        <p style={{ display: "inline" }}>Weather App</p>
      </div>
      {/*rendering the CurrentWeather componant*/}
      <WeatherSearch></WeatherSearch>
      {/*tacking citiCodes from cities.json and passing it to the citiesWeather componant to render the  the weather of cities*/}
      <div className="grid-container">
        {ct.List.map((item, index) => (
          <Link
            to={`/pages/${item.CityCode}`}
            key={item.CityCode}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}>
            <div
              className="grid-item"
              style={{ backgroundColor: colors[index] }}>
              <CitiesWeather cityCode={item.CityCode}></CitiesWeather>
            </div>
          </Link>
        ))}
      </div>
      <div className="footer-container">
        <div className="page-footer">2023 Dilshan Geethapriya</div>
      </div>
    </div>
  );
}

export default App;
