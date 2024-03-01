import axios, { AxiosResponse } from "axios";
import {UserData, ServerResponse} from './userData.interface'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,  // Замените на базовый URL вашего сервера
});

export const registerUser = async (userData: UserData) => {
  try {
    const response: AxiosResponse<ServerResponse> = await axiosInstance.post("api/auth/register/", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;