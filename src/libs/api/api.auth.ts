import axiosInstance from "./api.axios";

import {
  LoginFormPayload,
  AuthResponse,
  RegisterFormPayload,
  ContactFormPayload,
} from "@/types/auth";

export const registerAPI = async (
  data: RegisterFormPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/register",
    data
  );
  return response.data;
};

export const loginAPI = async (
  data: LoginFormPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const logoutAPI = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/logout", {});
  return response.data;
};

export const contactAPI = async (
  data: ContactFormPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/contact",
    data
  );
  return response.data;
};

export const getUserProfileAPI = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/profile");
  return response.data;
};

export const getAccessTokenAPI = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/refresh", {
    remember: localStorage.getItem("rememberme"),
  });
  return response.data;
};
