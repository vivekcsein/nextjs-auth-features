"use client";
import clsx from "clsx";
import React from "react";
import { Label } from "../shadcn/label";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

interface InputCheckboxProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  errorMessage?: string;
  id?: string;
  disabled?: boolean;
}

const InputCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  disabled,
  errorMessage,
  id,
  placeholder,
}: InputCheckboxProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={clsx(
              "h-4 w-4  cursor-pointer",
              errorMessage ? "border-destructive" : "border-primary-foreground"
            )}
          />
          {errorMessage ? (
            <Label htmlFor={`${id}-error`} className="text-destructive">
              {errorMessage}
            </Label>
          ) : (
            placeholder && (
              <Label htmlFor={name} className="text-muted-foreground">
                {placeholder}
              </Label>
            )
          )}
        </div>
      )}
    />
  );
};

export default InputCheckbox;
