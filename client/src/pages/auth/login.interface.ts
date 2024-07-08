import { IUser } from 'store/slices/authSlice';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  access: string;
  refresh: string;
}
