"use client";
import React, { useState } from "react";
import { Input } from "../shadcn/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/libs/utils/utils-shadcn";

export type inputPasswordProps = React.ComponentProps<typeof Input>;

const InputPassword = ({ className, ...props }: inputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 cursor-pointer" />
        ) : (
          <Eye className="h-4 w-4 cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default InputPassword;
