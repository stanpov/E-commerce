import axios from "axios";
import { FilterProducts, ProductsData } from "../../interfaces/interfaces";

const url = `${process.env.REACT_APP_BASE_URL}`;

export const getProducts = async (): Promise<ProductsData> => {
    try {
        const response = await axios.get(`${url}/products/allproducts`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const searchProduct = async (search: string | any): Promise<ProductsData> => {
    try {
        const response = await axios.get(`${url}/products/allproducts?search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const filterProducts = async (filterData:FilterProducts): Promise<ProductsData> => {
    try {
        const response = await axios.get(`${url}/products/allproducts?category=${filterData.category}&brand=${filterData.brand}&sort=${filterData.sort}&rangeprice=${filterData.lowPrice},${filterData.highPrice}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};