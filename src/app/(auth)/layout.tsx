"use client";

import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/components/providers/AuthProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    } else if (!isLoading) {
      setShouldRender(true);
    }
  }, [isAuthenticated, isLoading, router]);

  if (!shouldRender) {
    return null; // No flicker, no loading text
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {children}
      <Toaster richColors position="top-center" />
    </main>
  );
};

export default AuthLayout;
