import jsCookies from "js-cookie";
// const url = (endpoint) => `http://api.b.test/${endpoint}`;
import axios from "axios";
const baseUrl = "http://api.b.test";
export const authClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // required to handle the CSRF token
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "XSRF-TOKEN": jsCookies.get("XSRF-TOKEN"),
  },
});

const setLogin = () => jsCookies.set("auth", "true");
const setlogOut = () => {
  const attr = { path: "/", domain: ".b.test" };
  jsCookies.remove("auth");
  jsCookies.remove("XSRF-TOKEN", attr);
  jsCookies.remove("laravel_session", attr);
  localStorage.removeItem("level");
  localStorage.removeItem("user");
};
const isLoggedIn = () => jsCookies.get("auth") == "true";

const getXsrfToken = () => {
  let token = jsCookies.get("XSRF-TOKEN");
  if (token) return Promise.resolve(token);
  return authClient.get("/sanctum/csrf-cookie");
};

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 419) {
      // setlogOut();
      const l = jsCookies.get("XSRF-TOKEN");
      console.log("log", l);
    }
    return Promise.reject(error.response);
  }
);
const authProvider = {
  login: async ({ username, password }) => {
    const token = await getXsrfToken();
    console.log(token);
    try {
      const response = await authClient.post("api/login", {
        username,
        password,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      setLogin();
    } catch (err) {
      const res = err.response;
      if (res) {
        const usernameErrors = res.data.errors.username;
        if (usernameErrors) {
          let message = "";
          usernameErrors.forEach((error) => {
            message += error;
          });
          throw new Error(message);
        }
        throw new Error(res.data.message);
      }
      throw new Error(err);
    }
  },
  checkAuth: () => (isLoggedIn() ? Promise.resolve() : Promise.reject()),
  getPermissions: () => {
    // Required for the authentication to work
    return Promise.resolve();
  },
  logout: () => {
    setlogOut();
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403 || status === 419) {
      setlogOut();
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: async () => {
    try {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
      } else {
        const request = authRequest("userinfo", "GET");
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        user = await response.json();
        localStorage.setItem("user", user);
      }
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: async () => {
    try {
      let level = localStorage.getItem("level");
      if (level) {
        level = JSON.parse(level);
      } else {
        const request = authRequest("authorization_level", "GET");
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        level = await response.json();
        localStorage.setItem("level", level);
      }
      return Promise.resolve(level);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default authProvider;
