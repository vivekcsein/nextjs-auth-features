"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthProvider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push("/signin");
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (isAuthenticated && user?.role !== "ADMIN") {
      const timeout = setTimeout(() => {
        router.push("/unauthorized"); // You can create this page to show a proper message
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return <div>Not authenticated. Redirecting to sign-in...</div>;
  }

  if (user?.role !== "ADMIN") {
    return <div>Access denied. Redirecting...</div>;
  }

  return <>{children}</>;
};

export default AdminLayout;
