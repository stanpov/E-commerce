import axios, { AxiosPromise } from "axios";
import {
  ChangePasswordData,
  ConfirmPasswordData,
  ResetPasswordData,
} from "../../interfaces/interfaces";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const changePassword = async (
  userData: ChangePasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(`${baseUrl}/users/changepassword`);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const confirmPassword = async (
  userData: ConfirmPasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(`${baseUrl}/users/confirmpassword`);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const resetPassword = async (
  userData: ResetPasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.post(
      `${baseUrl}/users/resetpassword`,
      userData
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
