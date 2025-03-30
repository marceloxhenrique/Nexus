import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("BaseUrl", BACKEND_BASE_URL);
export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
});
