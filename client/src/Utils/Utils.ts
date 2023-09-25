import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";
export const baseUrl = "http://localhost:4000/api";

export const getToken = () => {
    return Cookie.get("access_token");
};

export const setToken = (token: string) => {
    return Cookie.set("access_token", token);
};

export const removeToken = (token: string) => {
    return Cookie.remove(token);
};

export const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
    },
};

export const uploadToCloudinary = async (
    data: object
): Promise<AxiosResponse> => {
    const result = await axios(
        `https://api.cloudinary.com/v1_1/doyrxbbu7/image/upload`,
        {
            method: "POST",
            data: data,
        }
    );
    return result;
};

export const starsCount = (count: number): number[] => {
    let stars: number[] = [];
    let fullStarsCount = count;

    for (let i = fullStarsCount; i > 0; i--) {
        if (i >= 1) {
            stars.push(1);
        }
        else {
            stars.push(0.5);
        }
    };

    for (let i = stars.length; i < 5; i++) {
        stars.push(0);
    }

    return stars;
}

export const dateConvert = (date: string): string  => {
    let currentDate = new Date(date).toLocaleDateString('en-GB');
    return currentDate;
} 
