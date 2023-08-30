import axios, { AxiosPromise } from "axios";
import {
  ChangePasswordData,
  ConfirmPasswordData,
  ResetPasswordData,
} from "../../interfaces/interfaces";
import { successNotification, errorNotification } from "../../services/notificationServices";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const changePassword = async (
  userData: ChangePasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(`${baseUrl}/users/changepassword`,userData);
    successNotification(`${response.data.message}`)
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.message}`)
    throw error.response.data.message;
  }
};

export const confirmPassword = async (
  userData: ConfirmPasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(`${baseUrl}/users/confirmpassword`,userData);
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
