export interface LayoutProps {
    children?: React.ReactNode;
}

export interface UserDataRegister {
    userName: string;
    password: string;
    email: string;
    isAdmin?: boolean;
}

export interface logOutResponse {
    message: string;
    id: number;
}

export interface UserDataResponse {
    userId: string | null;
    password: string;
    email: string;
    isAdmin?: boolean;
    message?: string;
}

export interface UserDataLogin {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    id: string | undefined;
    message: string | undefined;
    access_token: string;
    isVerified: boolean;
}

export interface UserId {
    userId: string;
}

export interface UserInformationData {
    isAdmin: string;
    deliveryAddress?: string;
    phoneNumber?: string;
    userImage?: string;
    verified: string;
    email: string;
    userName: string;
    lastReviewed?: Product[];
}

export interface UpdateUserData {
    userImage?: string | ArrayBuffer | null;
    userName: string,
    phoneNumber: number | string,
    deliveryAddress: string,
}

export interface UpdateUserProfile {
    userId: string;
    userData: UpdateUserData;
}

export interface UserVerifyData {
    userId: string;
    otp: string;
}

export interface InitalState {
    isLoading: boolean;
    isError: boolean;
    message: string | null;
}

export interface ChangePasswordData {
    email: string;
    password: string;
    newPassword: string;
}

export interface ConfirmPasswordData {
    email: string;
    tempPassword: string;
}

export interface ResetPasswordData {
    email: string;
}


export interface Rating {
    userName?: string;
    comment?: string;
    rating?: number;
    createdAt?:string;
    id:string;
}



export interface Product {
    _id: string;
    productName: string;
    image: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    rating: Rating[];
    numReviews: number;
    brand: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsData {
    total: number;
    page: number;
    limit: number;
    category: string[];
    products: Product[];
    brand: string[];
}

export interface SearchItem {
    search: string | undefined | object
}

export interface FilterProducts {
    category?: string | undefined | object;
    brand?: string | undefined | object;
    sort?: string | undefined | object;
    lowPrice:string | undefined | object;
    highPrice:string | undefined | object;
}
