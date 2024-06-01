import axios from "axios";

const API_URL = "https://localhost:5001/api/";

///////////////////////// -- Create an Axios instance -- /////////////////////////
const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  ///////////////////////// -- Adding an interceptor to add authorization header -- /////////////////////////

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  ///////////////////////// -- An interceptor to handle errors -- /////////////////////////

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
