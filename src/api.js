const API_KEY = "a719e5153dd717dbe785ffe308365932";

export const getLocation = (query) => {
  if (typeof query != "string") throw new Error("query must be a string");

  return fetch(
    "http://api.openweathermap.org/geo/1.0/direct?" +
      new URLSearchParams({ q: query, limit: 1, appid: API_KEY })
  ).then((res) => res.json());
};

export const getHourlyForecast = (activeLocation, cnt) => {
  return fetch(
    "https://api.openweathermap.org/data/2.5/forecast?" +
      new URLSearchParams({
        lat: activeLocation.lat,
        lon: activeLocation.lon,
        appid: API_KEY,
        units: "metric",
      })
  ).then((res) => res.json());
};
export const getCurrentWeather = (activeLocation) => {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      new URLSearchParams({
        lat: activeLocation.lat,
        lon: activeLocation.lon,
        appid: API_KEY,
        units: "metric",
      })
  ).then((res) => res.json());
};

// export const getDailyForecast = (activeLocation, cnt) => {
//   return fetch(
//     "https://pro.openweathermap.org/data/2.5/forecast/climate?" +
//       new URLSearchParams({
//         lat: activeLocation.lat,
//         lon: activeLocation.lon,
//         cnt: cnt || 7,
//         appid: API_KEY,
//         units: "metric",
//       })
//   ).then((res) => res.json());
// };
