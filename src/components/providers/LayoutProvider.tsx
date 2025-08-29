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
    let isMounted = true;

    const getUserProfile = async () => {
      try {
        const response = await getUserProfileAPI();

        if (!response?.status || !response?.data) {
          if (isMounted) {
            toast.error("Failed to fetch profile");
            setIsAuthenticated(false);
            setUser(null);
          }
          return;
        }

        const { data } = response;

        if (isMounted) {
          setUser(data);
          setIsAuthenticated(true);
          toast.success("Welcome back " + data.fullname + "!");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (isMounted) {
          toast.error("Session expired or invalid");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    getUserProfile();

    return () => {
      isMounted = false;
      console.log("LayoutProvider unmounted");
    };
  }, [setIsAuthenticated, setUser]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      {children}
      <Toaster />
    </main>
  );
};

export default LayoutProvider;
