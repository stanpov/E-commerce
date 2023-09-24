import axios from "axios";
import { Product } from "../../interfaces/interfaces";


const url = `${process.env.REACT_APP_BASE_URL}`;

export const getCurrentProduct = async (productId: string): Promise<Product> => {
    try {
        const response = await axios.get(`${url}/products/product/${productId}`,{
            withCredentials:true,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data.response;
    } catch (error: any) {
        throw error
    }
}