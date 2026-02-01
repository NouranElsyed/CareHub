import axios from "axios";

export const api = axios.create({
  baseURL: "https://clinic-api-iota.vercel.app/api",
   withCredentials: true,
});
