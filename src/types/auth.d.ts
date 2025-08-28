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
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
}

export interface LoginPayload {
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

export interface AuthResponse {
  status: "success" | "failed";
  data?: User;
  message: string;
  error?: unknown;
}

export interface LogoutResponse {
  status: "success" | "failed";
  message: string;
}
export interface ContactFormResponse {
  status: "success" | "failed";
  message: string;
}
