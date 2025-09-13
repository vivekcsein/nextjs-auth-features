import Link from "next/link";
import { ResetPasswordForm } from "@/components/context/auth/auth.main";

const ForgetPasswordPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Link
        href="/"
        className="text-primary hover:underline transition underline-offset-4 decoration-solid"
      >
        Return to Homepage
      </Link>
      <ResetPasswordForm />
    </div>
  );
};

export default ForgetPasswordPage;
