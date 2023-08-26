import axios from "axios";
import { ProductsData } from "../../interfaces/interfaces";

const url = `${process.env.REACT_APP_BASE_URL}`;

export const getProducts = async ():Promise<ProductsData[]>  => {
    
    try {
        console.log(url);
        const response = await axios.get(`${url}/products/allproducts`);
        console.log(response.data);
        
        return response.data.response;
    } catch (error: any) {
        throw error.response.data.message;
    }
};