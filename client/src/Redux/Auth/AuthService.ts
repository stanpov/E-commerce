import axios from "axios";
import { config, setToken } from "../../Utils/Utils";
import {
  UserDataLogin,
  UserDataRegister,
  UserDataResponse,
  UserLoginResponse,
} from "../../interfaces/interfaces";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const register = async (
  userData: UserDataRegister
): Promise<UserDataResponse> => {
  try {
    const response = await axios.post(`${baseUrl}/users/signup`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

const login = async (UserData: UserDataLogin): Promise<UserLoginResponse> => {
  try {
    const response = await axios.post(`${baseUrl}/users/signin`, UserData);
    if (response.status === 200) {
      setToken(response.data?.access_token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const AuthService = {
  register,
  login,
};
