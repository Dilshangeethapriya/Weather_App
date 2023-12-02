import {
  API_WEATHER_UNITS,
  WEATHER_API_BASE_URL,
  WEATHER_ICON_BASE_URL,
} from "../data/constants";

function getWeatherImgUrl(iconID) {
  return `${WEATHER_ICON_BASE_URL}${iconID}@2x.png`;
}

function getWeatherWithCityCode(id) {
  const apiUrl = `${WEATHER_API_BASE_URL}?id=${id}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&${API_WEATHER_UNITS}`;

  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Convert response to JSON
  });
}

function getWeatherWithCityName(cityName) {
  const apiUrl = `${WEATHER_API_BASE_URL}?q=${cityName}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&${API_WEATHER_UNITS}`;

  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export { getWeatherImgUrl, getWeatherWithCityCode, getWeatherWithCityName };
