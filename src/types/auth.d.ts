// auth types file

export type IUserProfileRoleType = "ADMIN" | "USER" | "MODERATOR";

export interface User {
  id: string;
  user_id: string;
  email: string;
  fullname: string;
  avatar: string;
  role: IUserProfileRoleType;
  created_at: string;
  updated_at: string;
  isUserVerified?: boolean;
  tokenExpiresIn?: number;
}

export interface RegisterFormPayload {
  email: string;
  password: string;
  fullname: string;
}

export interface LoginFormPayload {
  email: string;
  password: string;
}

export interface ContactFormPayload {
  email: string;
  fullname: string;
  topic: string;
  message: string;
  newsletter?: boolean;
}

export interface apiResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse extends apiResponse {
  status?: "success" | "error";
  data?: User | null;
  error?: unknown;
}
