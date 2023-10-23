import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://mystoreapi.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // khong fix duoc loi CORS duoc
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem("token");
};

export default axiosInstance;
