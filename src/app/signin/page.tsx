import React from "react";
import Link from "next/link";
import { SigninForm } from "@/components/forms/auth.main";

const SigninPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Link
        href={"/"}
        className="hover:underline text-primary transition underline-offset-4 decoration-solid"
      >
        return to Homepage
      </Link>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
