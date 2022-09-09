import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://leoteleport.herokuapp.com",
});