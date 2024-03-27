export const APIkey = "ba0711daedee46aaa6acb72bd350c0d8";
export const baseUrl = "https://nomoreparties.co/news/v2/everything";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
const currentDate = new Date();
export const getCurrentDate = () => {
  return currentDate.toLocaleString();
};
const lastWeekDate = new Date();
export const getLastWeekDate = () => {
  lastWeekDate.setDate(currentDate.getDate() - 7);
  return lastWeekDate.toDateString();
};

// "https://newsapi.org/v2/everything";
