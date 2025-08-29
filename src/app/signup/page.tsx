"use client";
import React from "react";
import Link from "next/link";
import { SignupForm } from "@/components/forms/auth.main";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthContext";

const SignupPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    router.push("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 ">
      <Link
        href={"/"}
        className="hover:underline text-primary transition underline-offset-4 decoration-solid"
      >
        return to Homepage
      </Link>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
