import axios from "axios";


export const api = axios.create({
  baseURL: `/api/ecom/v1`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

