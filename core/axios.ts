import { SERVER_URL } from ".";
import axios from "axios";

export const axiosUser = axios.create({
    baseURL: SERVER_URL,
});
