export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface ServerResponse {
  success: boolean;
  message: string;
}

export interface UserLoginData{
  email: string;
  password: string;
}
