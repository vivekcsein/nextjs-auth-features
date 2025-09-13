import Link from "next/link";
import { SignupForm } from "@/components/context/auth/auth.main";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Link
        href="/"
        className="text-primary hover:underline transition underline-offset-4 decoration-solid"
      >
        Return to Homepage
      </Link>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
