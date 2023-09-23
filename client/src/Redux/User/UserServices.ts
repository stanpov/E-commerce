import axios, { AxiosPromise } from "axios";
import {
  ChangePasswordData,
  ConfirmPasswordData,
  ResetPasswordData,
  UpdateUserProfile,
  UserId,
} from "../../interfaces/interfaces";
import {
  successNotification,
  errorNotification,
} from "../../services/notificationServices";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const changePassword = async (
  userData: ChangePasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(
      `${baseUrl}/users/changepassword`,
      userData
    );
    if (response.status === 202) {
      successNotification(`${response.data.data.message}`);
    }
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.data.message}`);
    throw error.response.data.data.message;
  }
};

export const confirmPassword = async (
  userData: ConfirmPasswordData
): Promise<AxiosPromise> => {
  try {
    const response = await axios.put(
      `${baseUrl}/users/confirmpassword`,
      userData
    );
    if (response.status === 201) {
      successNotification(`${response.data.data.message}`);
    }
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.data.message}`);
    throw error.response.data.data.message;
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
    if (response.status === 202) {
      successNotification(`${response.data.data.message}`);
    }
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.message}`);
    throw error.response.data.message;
  }
};

export const getUserInformation = async (
  UserData: UserId
): Promise<AxiosPromise> => {
  try {
    const response = await axios.get(
      `${baseUrl}/users/getuserInformation/${UserData.userId}`
    );
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.message}`);
    throw error.response.data.message;
  }
};

export const updateUserInformation = async (
  data: UpdateUserProfile
): Promise<AxiosPromise> => {
  try {
    const response = await axios.post(
      `${baseUrl}/users/updateuserinformation/${data.userId}`,
      data.userData
    );
    if (response.status === 202) {
      successNotification(`${response.data.message}`);
    }
    return response.data;
  } catch (error: any) {
    errorNotification(`${error.response.data.message.message}`);
    throw error.response.data.message.message;
  }
};
