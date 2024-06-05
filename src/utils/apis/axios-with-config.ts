import axios from "axios";

const axiosWithConfig = axios.create();

let token = "";

export const setAxiosConfig = (value: string) => {
  token = value;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  axiosConfig.headers.Authorization = `Bearer ${token}`;
  return axiosConfig;
});

export default axiosWithConfig;
