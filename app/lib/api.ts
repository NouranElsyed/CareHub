import axios from "axios";

export const api = axios.create({
  baseURL: "https://clinic-pybntmlyf-nouran-elsayeds-projects.vercel.app/api",
  withCredentials: true,
});
