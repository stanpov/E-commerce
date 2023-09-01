import axios, { AxiosResponse } from "axios";
import { config, getToken, removeToken, setToken } from "../../Utils/Utils";
import {
    UserDataLogin,
    UserDataRegister,
    UserDataResponse,
    UserLoginResponse,
    UserVerifyData,
} from "../../interfaces/interfaces";
import { successNotification, errorNotification } from "../../services/notificationServices";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const register = async (
    userData: UserDataRegister
): Promise<UserDataResponse> => {
    try {
        const response = await axios.post(`${baseUrl}/users/signup`, userData);
        if (response.status === 201) {
            setToken(response.data?.access_token);
            successNotification(`${response.data.message}`);
        }
        console.log(response.data);
        
        return response.data;

    } catch (error: any) {
        errorNotification(`${error.response.data.message}`);
        throw error.response.data.message;
    }
};

const login = async (UserData: UserDataLogin): Promise<UserLoginResponse> => {
    try {
        const response = await axios.post(`${baseUrl}/users/signin`, UserData);
        if (response.status === 200) {
            setToken(response.data?.access_token);
            successNotification(`${response.data.message}`);
            console.log(response.data);

        }
        return response.data;
    } catch (error: any) {
        errorNotification(`${error.response.data.message}`);
        throw error.response.data.message;
    }
};

const logout = async (): Promise<AxiosResponse> => {
    try {
        const response = await axios.post(
            `${baseUrl}/users/signout`,
            {
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
            },
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            removeToken("access_token");
            successNotification(`${response.data.data.message}`);
        }
        return response.data;
    } catch (error: any) {
        errorNotification(`${error.response.data.message}`);
        throw error.response.data.message;
    }
};

const verify = async (UserData:UserVerifyData): Promise<AxiosResponse> => {
    try {
        const response = await axios.get(`${baseUrl}/users/verify/${UserData.userId}/${UserData.otp}`)
        if (response.status === 200) {
            setToken(response.data?.access_token);
            successNotification(`${response.data.data.message}`);
        }
        return response.data
    } catch (error: any) {
        errorNotification(`${error.response.data.message}`);
        throw error.response.data.message;
    }
}

export const AuthService = {
    register,
    login,
    logout,
    verify
};
