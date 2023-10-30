import axios from "axios";

export const api = axios.create({
  baseURL: "https://writing-hat-api.vercel.app/api",
});
