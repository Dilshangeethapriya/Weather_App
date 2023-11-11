import {
  API_WEATHER_UNITS,
  WEATHER_API_BASE_URL,
  WEATHER_ICON_BASE_URL,
} from "../data/constants";

function getUrlWithId(cityCode) {
  return `${WEATHER_API_BASE_URL}?id=${cityCode}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&${API_WEATHER_UNITS}`;
}

function getUrlWithName(cityName) {
  return `${WEATHER_API_BASE_URL}?q=${cityName}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&${API_WEATHER_UNITS}`;
}

function getWeatherImgUrl(iconID) {
  return `${WEATHER_ICON_BASE_URL}${iconID}@2x.png`;
}

export { getUrlWithId, getUrlWithName, getWeatherImgUrl };
