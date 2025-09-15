"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { useSession } from "@/components/providers/AuthProvider";

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated, user, signoutUser, isLoading } = useSession();

  useEffect(() => {
    router.refresh();
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br text-gray-800">
      <section className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          Welcome to the Next.js Auth App
        </h1>

        {isLoading ? (
          <p className="text-lg animate-pulse text-muted-foreground">
            Loading session...
          </p>
        ) : isAuthenticated ? (
          <>
            <div className="space-y-4">
              <p className="text-lg">
                Welcome{" "}
                <span className="font-semibold text-primary">
                  {user?.fullname}
                </span>{" "}
                👋
              </p>
              <p className="text-sm text-muted-foreground">
                You are signed in. Your security is our top priority.
              </p>
              <p className="text-base font-medium mt-6">
                🔐 Technologies used in this project:
              </p>
              <div className="flex justify-center items-center">
                <ul className="list-disc list-inside text-left text-sm grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                  <li>Next.js</li>
                  <li>React</li>
                  <li>Fastify</li>
                  <li>Axios</li>
                  <li>React Hook Form</li>
                  <li>Supabase</li>
                  <li>JsonWebToken</li>
                  <li>TypeScript</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                onClick={signoutUser}
                variant="gradient"
                className="w-full sm:w-auto"
              >
                Sign Out
              </Button>
              <Button
                onClick={() => router.push("/profile")}
                variant="gradient"
                className="w-full sm:w-auto"
              >
                Go to Profile
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-muted-foreground">
              Please sign in to continue.
            </p>
            <Link href="/signin">
              <Button
                variant="default"
                className="mt-4 px-6 py-3 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
