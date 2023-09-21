import axios from "axios";
import { ProductsData } from "../../interfaces/interfaces";

const url = `${process.env.REACT_APP_BASE_URL}`;

export const getProducts = async (): Promise<ProductsData> => {
    try {
        const response = await axios.get(`${url}/products/allproducts`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const searchProduct = async (search:string | any): Promise<ProductsData> => {
    try {
        const response = await axios.get(`${url}/products/allproducts?search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}   