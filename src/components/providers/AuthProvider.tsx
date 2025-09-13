"use client";

import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { sendToast } from "@/libs/utils/utils.app";
import { SchemaType } from "../context/auth/auth.main";
import { handleErrorMessage } from "@/libs/api/api.axios";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

import {
  loginAPI,
  logoutAPI,
  registerAPI,
  getUserProfileAPI,
} from "@/libs/api/api.auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signoutUser: () => Promise<void>;
  getUserProfile: () => Promise<void>;
  signinUser: (data: SchemaType<"signin">) => Promise<void>;
  signupUser: (data: SchemaType<"signup">) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const hasFetchedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const resetUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const getUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfileAPI();

      if (!response?.success || !response?.data) {
        throw new Error("Invalid session or missing user data");
      }

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("getUserProfile error:", error);
      }
      resetUser();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signupUser = async (data: SchemaType<"signup">) => {
    setIsLoading(true);
    try {
      const response = await registerAPI(data);

      if (!response) {
        throw new Error("No response from server");
      }

      const { success, message, data: userData } = response;

      if (success && userData) {
        setUser(userData);
        setIsAuthenticated(true);
        sendToast(message || "Sign up successful");
        router.push("/signin");
      } else {
        throw new Error(message || "Failed to sign up");
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signinUser = async (data: SchemaType<"signin">) => {
    setIsLoading(true);
    try {
      const response = await loginAPI(data);

      if (!response) {
        throw new Error("No response from server");
      }

      const { success, message, data: userData } = response;

      if (success && userData) {
        setUser(userData);
        setIsAuthenticated(true);

        if (data.remember !== undefined) {
          localStorage.setItem("rememberme", String(data.remember));
        }

        sendToast(message || "Sign in successful");
        router.push("/");
      } else {
        throw new Error(message || "Failed to sign in");
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signoutUser = async () => {
    try {
      const response = await logoutAPI();

      if (response?.success) {
        resetUser();
        sendToast("Signed out successfully");
      } else {
        throw new Error(response?.message ?? "Failed to sign out");
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      signupUser,
      signinUser,
      signoutUser,
      getUserProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within AuthProvider");
  }
  return context;
};
