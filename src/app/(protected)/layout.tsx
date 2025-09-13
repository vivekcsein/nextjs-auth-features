"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthProvider";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();
  const [shouldRender, setShouldRender] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setCountdown(3); // Start countdown
      } else {
        setShouldRender(true); // Authenticated, allow rendering
      }
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      router.push("/signin");
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, router]);

  if (isLoading) {
    return null; // Wait for session to resolve
  }

  if (countdown !== null && countdown > 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-lg font-medium">
        Redirecting in {countdown}...
      </div>
    );
  }

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
