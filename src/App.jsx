import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import CityGrid from "./components/CitiGrid.jsx";
import WeatherSearch from "./components/CurrentWeather.jsx";
import TitleBar from "./components/TitleBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="app">
      {/*rendering the title bar on the top*/}
      <TitleBar></TitleBar>
      {/*rendering the CurrentWeather componant*/}
      <WeatherSearch></WeatherSearch>
      {/* rendering all wether infromation of cities from cities.json */}
      <CityGrid></CityGrid>
      {/*Rendering page fotter*/}
      <Footer></Footer>
    </div>
  );
}

export default App;
