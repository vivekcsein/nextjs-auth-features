"use client";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { SchemaType } from "../forms/auth.main";
import { sendToast } from "@/libs/utils/utils.app";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

import {
  getUserProfileAPI,
  loginAPI,
  logoutAPI,
  registerAPI,
} from "@/libs/api/api.auth";
import { handleErrorMessage } from "@/libs/api/api.axios";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signoutUser: () => Promise<void>;
  signinUser: (data: SchemaType<"signin">) => Promise<void>;
  signupUser: (data: SchemaType<"signup">) => Promise<void>;
  getUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasFetchedRef = useRef(false);

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfileAPI();

      if (!response?.success || !response?.data) {
        sendToast("Failed to fetch profile", true);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setUser(response.data);
      setIsAuthenticated(true);
      // sendToast(`Welcome back ${response.data.fullname}!`);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setUser(null);
      setIsAuthenticated(false);
      sendToast("Session expired or invalid", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true; // ✅ Ensures fetch runs only once
      getUserProfile();
    }
  }, []);

  const signupUser = async (data: SchemaType<"signup">) => {
    try {
      setLoading(true);
      const response = await registerAPI(data);

      if (!response) {
        sendToast("No response from server");
        return;
      }

      const { success, message, data: userData } = response;

      if (success && userData) {
        setIsAuthenticated(true);
        setUser(userData);
        sendToast(message || "Sign up successful");
        router.push("/signin");
      } else {
        sendToast(message || "Failed to sign up");
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const signinUser = async (data: SchemaType<"signin">) => {
    try {
      setLoading(true);
      const response = await loginAPI(data);

      if (!response) {
        sendToast("No response from server", true);
        return;
      }

      const { success, message, data: userData } = response;

      if (success && userData) {
        setIsAuthenticated(true);
        setUser(userData);

        if (data.remember !== undefined) {
          localStorage.setItem("remember", String(data.remember));
        }

        sendToast(message || "Sign in successful");
        router.push("/");
      } else {
        sendToast(message || "Failed to sign in");
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const signoutUser = async () => {
    try {
      const response = await logoutAPI();
      if (response?.success) {
        setIsAuthenticated(false);
        setUser(null);
        sendToast("Signed out successfully");
      } else {
        sendToast(response?.message ?? "Failed to sign out");
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      signupUser,
      signinUser,
      signoutUser,
      getUserProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
