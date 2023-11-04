import CitiesWeather from "./CitiesWeather.jsx";
import ct from "../data/cities.json"; // importing cities.json to the program to extract cityCodes
import { Link } from "react-router-dom";
import "../styles/colors.css";

function CitiGrid() {
  /*tacking citiCodes from cities.json and passing it to the citiesWeather componant to render the  the weather of cities*/
  return (
    <div className="grid-container">
      {ct.List.map((item, index) => (
        <div key={item.CityCode}>
          <Link className="link-style" to={`/pages/${item.CityCode}`}>
            <div className={`grid-item item-color-${(index % 11) + 1}`}>
              <CitiesWeather cityCode={item.CityCode}></CitiesWeather>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CitiGrid;
