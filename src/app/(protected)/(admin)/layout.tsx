"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthProvider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }

    if (isAuthenticated && user?.role !== "ADMIN") {
      router.push("/"); // You can create this page to show a proper message
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
