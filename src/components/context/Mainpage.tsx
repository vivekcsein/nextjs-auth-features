"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/shadcn/button";
import { useAuth } from "../providers/AuthContext";

const Mainpage = () => {
  const { isAuthenticated, user, signoutUser, loading } = useAuth();
  const router = useRouter();

  // Refresh route when auth state changes
  useEffect(() => {
    router.refresh();
  }, [isAuthenticated, router]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Welcome to the Next.js Auth App</h1>

      {isAuthenticated ? (
        <>
          <p className="mt-4 pb-4">
            Welcome {user?.fullname}, please sign out to continue.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Button onClick={signoutUser} variant="gradient">
              Sign Out
            </Button>
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              variant="gradient"
              className="px-6 py-4"
            >
              Profile
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4">Please sign in to continue.</p>
          <Link
            href="/signin"
            className="mt-4 inline-block bg-primary px-4 py-2 rounded text-white hover:bg-primary/90 transition"
          >
            Sign In
          </Link>
        </>
      )}
    </div>
  );
};

export default Mainpage;
