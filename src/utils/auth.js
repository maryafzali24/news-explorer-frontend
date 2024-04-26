import { baseUrl, processServerResponse } from "./constants";

export const signUp = (email, password, name) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => processServerResponse(res))
    .then((res) => res);
};

export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => processServerResponse(res))
    .then((data) => {
      if (data) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => processServerResponse(res))
    .then((data) => data);
};
