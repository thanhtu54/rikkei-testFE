import axios from "axios";
import axiosInstance from "../libs/axios";

const useUser = () => {
  const createUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/user", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://mystoreapi.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  return { createUser, loginUser, getUser };
};

export default useUser;
