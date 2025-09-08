import React from "react";
import { Toaster } from "sonner";
interface LayoutProviderProps {
  children: React.ReactNode;
}
const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      {children}
      <Toaster />
    </main>
  );
};

export default LayoutProvider;
