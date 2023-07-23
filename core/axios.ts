import axios from "axios";
import { SERVER_URL } from ".";
import createAuthRefreshInterceptor from "axios-auth-refresh";

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
createAuthRefreshInterceptor(axiosUser, (failedRequest) =>
    axiosNoUser.post("user-refresh/").then((response) => {
        const { accessToken } = response.data;
        const bearer = `Bearer ${accessToken}`;

        // Set auth headers
        axiosUser.defaults.headers.Authorization = bearer;
        failedRequest.response.config.headers.Authorization = bearer;

        return Promise.resolve();
    })
);
