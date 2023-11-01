// this js file is created to keep  cach of the fetched data from API for 5 minutes
let cache = {};
let expirationTime = {};

function getCache(key) {
  // returning the cache data
  return cache[key];
}

function setCache(key, data) {
  // setting the cache data
  setExpiration(key, Date.now() + 5 * 60 * 1000);
  cache[key] = data;
}

function setExpiration(key, exp) {
  // setting the expriration time
  expirationTime[key] = exp;
}

function getExpiration(key) {
  // returning the expiration time
  return expirationTime[key];
}

export { getCache, setCache, getExpiration };
