"use client";
import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";

interface InputCalenderProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  className?: string;
  placeholder?: string;
}

const InputCalender = <TFieldValues extends FieldValues>({
  name,
  control,
  className = "",
  placeholder = "Select date",
}: InputCalenderProps<TFieldValues>) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const date = field.value as Date | undefined;
          const setDate = (selected: Date | undefined) =>
            field.onChange(selected);

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={name}
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
};

export default InputCalender;
