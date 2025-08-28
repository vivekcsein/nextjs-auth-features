import axiosInstance from "./api.axios";

import {
  LoginPayload,
  AuthResponse,
  LogoutResponse,
  RegisterPayload,
  ContactFormPayload,
  ContactFormResponse,
} from "@/types/auth";

export const registerAPI = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/register",
    data
  );
  return response.data;
};

export const loginAPI = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const logoutAPI = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>("/auth/logout", {});
  return response.data;
};

export const contactAPI = async (
  data: ContactFormPayload
): Promise<ContactFormResponse> => {
  const response = await axiosInstance.post<ContactFormResponse>(
    "/auth/contact",
    data
  );
  return response.data;
};

export const getUserProfileAPI = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/profile");
  return response.data;
};
