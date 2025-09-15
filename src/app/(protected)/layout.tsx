"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthProvider";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !isInitialLoad) {
      if (!isAuthenticated) {
        setCountdown(3);
      }
    }
  }, [isLoading, isAuthenticated, isInitialLoad, router]);

  useEffect(() => {
    // This effect manages the countdown timer itself.
    if (countdown === 0) {
      if (!isAuthenticated) {
        router.push("/signin");
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    // Cleanup the interval on unmount or when countdown changes.
    return () => clearInterval(timer);
  }, [countdown]);

  if (isLoading || isInitialLoad) {
    return null;
  }

  // If the countdown is active, display the redirect message.
  if (countdown !== null && countdown > 0) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex min-h-screen items-center justify-center text-center text-lg font-medium"
      >
        You are redirecting to homepage in {countdown}...
      </div>
    );
  }

  // If the user is authenticated, render the children.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedLayout;
