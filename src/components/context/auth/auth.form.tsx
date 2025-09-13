"use client";
import clsx from "clsx";
import { useMemo } from "react";
import AuthForm, { FormInputType, FormListType } from "@/libs/forms/form.auth";

import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/shadcn/textarea";
import InputSelect from "@/components/ui/inputs/InputSelect";
import InputCheckbox from "@/components/ui/inputs/InputCheckbox";
import InputCalender from "@/components/ui/inputs/InputCalender";
import InputPassword from "@/components/ui/inputs/InputPassword";

import {
  Control,
  FieldErrors,
  useForm,
  UseFormRegister,
} from "react-hook-form";

import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

import Link from "next/link";
import { SchemaKey, schemaMap, SchemaType } from "./auth.main";

// 🧠 Default Values
const defaultAuthValues: Record<string, string | boolean> = {
  fullname: "John Doe",
  email: "johndoe@gmail.com",
  password: "JohnDoe#123",
  confirmPassword: "JohnDoe#123",
  remember: false,
  agreeToTerms: false,
};

const initialValues = (formList: FormListType) =>
  formList.formInputs.reduce(
    (acc, curr) => {
      const defaultValue = defaultAuthValues[curr.id];
      acc[curr.id] = defaultValue ?? (curr.type === "checkbox" ? false : "");
      return acc;
    },
    {} as Record<string, string | boolean | Date | number>
  );

// 🧩 Hook Factory
export const InstanceUseAuthForm = (schemaKey: SchemaKey) => {
  return useForm<SchemaType<SchemaKey>>({
    resolver: zodResolver(schemaMap[schemaKey]),
    defaultValues: initialValues(AuthForm[schemaKey]),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
  });
};

// 🧾 Form Template
interface FormTemplateProps {
  formList: FormListType;
  register: UseFormRegister<SchemaType<SchemaKey>>;
  control?: Control<SchemaType<SchemaKey>>;
  errors?: FieldErrors<SchemaType<SchemaKey>>;
  className?: string;
}

export const FormTemplate = ({
  formList,
  register,
  control,
  errors,
  className,
}: FormTemplateProps) => {
  const referTo = formList.referTo;
  return (
    <>
      <CardHeader className="flex justify-between items-center md:min-w-xl">
        <CardTitle className="flex items-center gap-2">
          Welcome to {formList.title}
        </CardTitle>
        {referTo && referTo.link && (
          <Label
            htmlFor={referTo?.link}
            className="text-sm text-muted-foreground"
          >
            {referTo?.label}
            <Link
              href={`/${referTo?.link}`}
              className=" cursor-pointer text-sm text-destructive underline hover:scale-105"
            >
              {referTo?.link}
            </Link>
          </Label>
        )}
      </CardHeader>
      <CardContent className={clsx("space-y-4", className)}>
        {formList.formInputs.map((input) => (
          <div key={input.id} className="flex flex-col gap-2">
            <UniversalInputField
              input={input}
              register={register}
              control={control}
              errors={errors}
            />
          </div>
        ))}
      </CardContent>
    </>
  );
};

// 🧮 Universal Input Field
interface UniversalFieldProps {
  input: FormInputType;
  control?: Control<SchemaType<SchemaKey>>;
  errors?: FieldErrors<SchemaType<SchemaKey>>;
  register: UseFormRegister<SchemaType<SchemaKey>>;
}

const UniversalInputField = ({
  input,
  control,
  errors,
  register,
}: UniversalFieldProps) => {
  const type = input.type;
  const selectValue = input.options;
  const commonProps = {
    id: input.id,
    placeholder: input.placeholder,
    autoComplete: input.id,
    ...register(input.id as keyof SchemaType<SchemaKey>),
  };

  const errorMessage = errors?.[input.id as keyof typeof errors]?.message;

  const renderedInput = useMemo(() => {
    if (type === "checkbox" && control)
      return (
        <InputCheckbox
          name={input.id as keyof SchemaType<SchemaKey>}
          control={control}
          errorMessage={errorMessage}
          id={input.id}
          placeholder={input.placeholder || ""}
        />
      );

    if (type === "date" && control)
      return (
        <InputCalender
          name={input.id as keyof SchemaType<SchemaKey>}
          control={control}
        />
      );
    if (type === "select" && control && selectValue)
      return (
        <InputSelect
          name={input.id as keyof SchemaType<SchemaKey>}
          control={control}
          options={selectValue}
        />
      );

    switch (type) {
      case "textarea":
        return <Textarea {...commonProps} />;
      case "number":
        return <Input type="number" {...commonProps} />;
      case "decimal":
        return <Input type="number" step={0.1} {...commonProps} />;
      case "tel":
        return <Input {...commonProps} />;
      case "password":
        return <InputPassword {...commonProps} />;
      default:
        return <Input type={type} {...commonProps} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, control, selectValue, input.id, input.placeholder, errorMessage]);

  return (
    <>
      {!["checkbox", "radio", "select", "date"].includes(type) && (
        <Label htmlFor={input.id}>{input.label}</Label>
      )}
      {renderedInput}
      {!["checkbox", "radio", "select", "date"].includes(type) && (
        <Label htmlFor={`${input.id}-error`} className="text-destructive">
          {errorMessage}
        </Label>
      )}
    </>
  );
};
