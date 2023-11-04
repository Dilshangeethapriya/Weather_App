import CitiesWeather from "./CitiesWeather.jsx";
import ct from "../data/cities.json"; // importing cities.json to the program to extract cityCodes
import { Link } from "react-router-dom";
import { linkstyle } from "../data/constants.js";
import { colors } from "../data/constants.js";

function CitiGrid() {
  /*tacking citiCodes from cities.json and passing it to the citiesWeather componant to render the  the weather of cities*/
  return (
    <div className="grid-container">
      {ct.List.map((item, index) => (
        <div key={item.CityCode}>
          {/* <style>{linkstyle}</style>*/}
          <Link className="link-style" to={`/pages/${item.CityCode}`}>
            <div
              className="grid-item"
              style={{ backgroundColor: colors[index] }}>
              {" "}
              {/* using Inline css to give dinamic colors to each generated container*/}
              <CitiesWeather cityCode={item.CityCode}></CitiesWeather>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CitiGrid;
