import axios, { AxiosPromise } from "axios";
import { ChangePasswordData } from "../../interfaces/interfaces";


const baseUrl = `${process.env.REACT_APP_BASE_URL}`;


export const changePassword = async (
    userData: ChangePasswordData): Promise<AxiosPromise> => {

    try {
        const response = await axios.put(`${baseUrl}/users/changepassword`);  
        return response.data;
        
    } catch (error: any) {
        throw error.response.data.message;
    }
};