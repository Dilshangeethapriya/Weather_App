import { CACHE_TIMEOUT } from "./constants";

function setCache(country, data) {
  // caching data with a timstamp in localstorage using countrycode or country name as the key
  const timestamp = new Date().getTime();
  const cacheData = { timestamp, data };
  localStorage.setItem(country, JSON.stringify(cacheData));
}

function getCache(country) {
  // getting data from cache
  const cacheData = localStorage.getItem(country);

  if (cacheData) {
    const { timestamp, data } = JSON.parse(cacheData);
    const timeNow = new Date().getTime();

    // check if the data if withing 5 minute time period
    if (timeNow - timestamp < CACHE_TIMEOUT) {
      return data;
    } else {
      // Removing expired cache from cache
      localStorage.removeItem(country);
    }
  }

  return null;
}

export { setCache, getCache };
