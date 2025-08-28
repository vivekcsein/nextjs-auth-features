"use client";
import React from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select";

interface InputSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  options: { label: string; value: string }[];
  placeholder?: string;
  control: Control<TFieldValues>;
}

const InputSelect = <TFieldValues extends FieldValues>({
  name,
  options,
  placeholder,
  control,
}: InputSelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="min-w-[200px] lg:w-fit">
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="focus:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default InputSelect;
