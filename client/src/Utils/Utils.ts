import Cookie from "js-cookie";
export const baseUrl = "http://localhost:4000/api";

export const getToken = () => {
  return Cookie.get("access_token");
};

export const setToken = (token: string) => {
  return Cookie.set("access_token", token);
};

export const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};
