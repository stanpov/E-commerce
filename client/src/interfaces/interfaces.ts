export interface LayoutProps {
  children?: React.ReactNode;
}

export interface UserDataRegister {
  userName: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}

export interface UserDataResponse {
  _id: string | null;
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