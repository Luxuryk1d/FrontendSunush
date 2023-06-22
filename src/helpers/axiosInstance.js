import axios from "axios";
import { localStorageCheck } from "./constants";
import axiosApi from "./axiosApi";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000"
});

axiosApi.interceptors.request.use((config) => {
  try {
    let user = "";
    if (localStorageCheck) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    config.headers["Authorization"] = user.token;
  } catch (e) {
    console.log("err")
  }
  return config;
});

export default axiosApi;

