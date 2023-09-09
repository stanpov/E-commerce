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
    userId:string;
}

export interface UserInformationData {
    isAdmin: string;
    deliveryAddress?: string;
    phoneNumber?: string;
    userImage?: string;
    verified: string;
    email: string;
    userName: string;
}

export interface UserVerifyData {
    userId: string;
    otp:string;
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

export interface Reviews {
    userName: string;
    comment: string;
    rating: number | string;
}

export interface ProductsData {
    productName: string;
    image: string;
    category: string;
    description: string;
    price: number | string;
    countInStock: number | string;
    rating: number | string;
    numReviews: number | string;
    reviews: [Reviews];
}
