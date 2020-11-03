// export const BASE_ADDRESS = "http://localhost:3000/";
// export const BASE_API = "http://localhost:7071/";
export const BASE_ADDRESS = "https://auditstory.azurewebsites.net/";
// export const BASE_API = "https://auditstoryalpine.azurewebsites.net/";
// export const BASE_ADDRESS = "https://my.auditstory.com/";
export const BASE_API = "https://api.auditstory.com/";

export const AUTH_CONFIG = {
  domain: "rashtan-invest.auth0.com",
  clientID: "CkaEgMvf79mNLow60TCeM3V6bamkbKDB",
  redirectUri: BASE_ADDRESS + "startSession",
  audience: "https://my.auditstory.com"
};

export const CountriesAPI =
  "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag;currencies";
