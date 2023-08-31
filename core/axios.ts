import axios from "axios";
import { SERVER_URL } from ".";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "@/store/store";

export const axiosNoUser = axios.create({
  baseURL: SERVER_URL,
});

export const axiosUser = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer`,
  },
});

// If request was failed with 401, trying to refresh the AccessToken
createAuthRefreshInterceptor(axiosUser, (failedRequest) => {
  const refresh = store.getState().account.user?.refresh;
  return axiosNoUser.post("user-refresh/", { refresh }).then((response) => {
    const { access } = response.data;
    const bearer = `Bearer ${access}`;

    // Set auth headers
    axiosUser.defaults.headers.Authorization = bearer;
    failedRequest.response.config.headers.Authorization = bearer;

    return Promise.resolve();
  });
});
