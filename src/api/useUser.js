import axios from "axios";
import axiosInstance from "../libs/axios";

const useUser = () => {
  const createUser = async (data) => {
    try {
      const res = await axios.post("https://mystoreapi.com/auth/user", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (data) => {
    try {
      const res = await axios.post("https://mystoreapi.com/auth/login", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosInstance.post("/auth/me");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, loginUser, getUser };
};

export default useUser;
