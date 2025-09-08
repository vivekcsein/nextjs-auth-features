"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthContext";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push("/signin");
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup to avoid memory leaks
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Not authenticated. Redirecting to sign-in...</div>;
  }

  if (isAuthenticated && user?.role !== "USER") {
    return <div>You dont have access to these pages...</div>;
  }

  return <>{children}</>;
};

export default UserLayout;
