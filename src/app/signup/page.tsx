import React from "react";
import Link from "next/link";
import { SignupForm } from "@/components/forms/auth.main";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 ">
      <Link
        href={"/"}
        className="mt-4 text-center bg-primary px-4 py-2 rounded text-white hover:bg-primary/90 transition"
      >
        Home
      </Link>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
