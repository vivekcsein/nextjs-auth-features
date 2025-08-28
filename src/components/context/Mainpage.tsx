"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/shadcn/button";
import { useAuth } from "../providers/AuthContext";
import { logoutAPI } from "@/libs/api/api.auth";

const Mainpage = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();
  const sendToast = (message: string) => {
    toast(message);
  };

  const LoggedOut = async () => {
    const response = await logoutAPI();
    if (response?.status === "success") {
      sendToast("User is signed Out");
      setIsAuthenticated(false);
      setUser(null);
    } else {
      toast.error("Failed to sign out");
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to the Next.js Auth App</h1>

      {isAuthenticated ? (
        <>
          <p className="mt-4 text-center pb-4">
            Welcome {user?.fullname}, please sign out to continue.
          </p>
          <Button
            onClick={() => {
              LoggedOut();
            }}
            variant={"gradient"}
          >
            SignOut
          </Button>
        </>
      ) : (
        <>
          <p className="mt-4 text-center">Please sign in to continue.</p>
          <Link
            href={"/signin"}
            className="mt-4 text-center bg-primary px-4 py-2 rounded text-white hover:bg-primary/90 transition"
          >
            Sign In
          </Link>
        </>
      )}
    </>
  );
};

export default Mainpage;
