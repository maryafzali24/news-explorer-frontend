import {
  processServerResponse,
  getCurrentDate,
  getLastWeekDate,
  APIkey,
  baseUrl,
} from "./constants";

export const getNews = (input) => {
  return fetch(
    `${baseUrl}?q=${input}&apiKey=${APIkey}&from=${getLastWeekDate}&to=${getCurrentDate}&pageSize=100`,
    {
      method: "GET",
      headers: {
        authorization: APIkey,
      },
    }
  ).then((res) => processServerResponse(res));
};
