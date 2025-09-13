"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthProvider";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useSession();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/signin");
      } else if (user?.role !== "USER") {
        setShouldRender(false);
      } else {
        setShouldRender(true);
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return null; // Prevent flicker during session resolution
  }

  if (isAuthenticated && user?.role !== "USER") {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-lg font-semibold text-red-600">
        🚫 You don&apos;t have access to these pages.
      </div>
    );
  }

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};

export default UserLayout;
