function getUrlWithId(cityCode) {
  return `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&units=metric`;
}

function getUrlWithName(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
    import.meta.env.VITE_REACT_API_KEY
  }&units=metric`;
}

function getWeatherImgUrl(iconID) {
  return `https://openweathermap.org/img/wn/${iconID}@2x.png`;
}

export { getUrlWithId, getUrlWithName, getWeatherImgUrl };
