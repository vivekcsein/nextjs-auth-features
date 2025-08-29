"use client";
import { toast, Toaster } from "sonner";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUserProfileAPI } from "@/libs/api/api.auth";
interface LayoutProviderProps {
  children: React.ReactNode;
}
const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await getUserProfileAPI();
        if (!response?.status || !response?.data) {
          toast.error("Failed to fetch profile");
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const { data } = response;
        setUser(data);
        setIsAuthenticated(true);
        toast.success("Welcome back " + data.fullname + "!");
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Session expired or invalid");
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    getUserProfile();

    return () => {
      console.log("LayoutProvider unmounted");
    };
  }, [setUser, setIsAuthenticated]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      {children}
      <Toaster />
    </main>
  );
};

export default LayoutProvider;
