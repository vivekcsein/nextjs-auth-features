"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { useSession } from "@/components/providers/AuthProvider";

const ProfilePage = () => {
  const { user } = useSession();
  const router = useRouter();
  return (
    <section>
      <h1 className="text-center text-4xl font-bold">User Profile</h1>
      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <Image
          src={user?.avatar || "/images/avatar/dummyAvatar.jpg"}
          alt="avatar"
          className="rounded-full w-32 h-32"
          width={256}
          height={256}
        />
        <h2 className="text-center text-2xl font-bold">
          {user?.fullname || "unknown user"}
        </h2>
        <p className="text-center text-sm">{user?.role || "USER"}</p>
        <Button
          onClick={() => {
            router.push("/");
          }}
          variant="gradient"
        >
          Homepage
        </Button>
      </div>
    </section>
  );
};

export default ProfilePage;
