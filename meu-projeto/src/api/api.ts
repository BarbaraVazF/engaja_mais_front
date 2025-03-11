import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
