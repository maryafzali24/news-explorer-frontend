import {
  processServerResponse,
  getCurrentDate,
  getLastWeekDate,
  APIkey,
} from "./constants";

export const getNews = (input) => {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${input}&apiKey=${APIkey}&from=${getLastWeekDate}&to=${getCurrentDate}&pageSize=100`
  ).then((res) => processServerResponse(res));
};
