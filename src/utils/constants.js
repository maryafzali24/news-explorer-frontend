export const APIkey = "ba0711daedee46aaa6acb72bd350c0d8";
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.news-explorer.strangled.net"
    : "http://localhost:3001";

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
