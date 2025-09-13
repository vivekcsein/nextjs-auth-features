"use client";
import z from "zod";
import AuthForm from "@/libs/forms/form.auth";
import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { FormTemplate, InstanceUseAuthForm } from "./auth.form";
import { useSession } from "@/components/providers/AuthProvider";

import {
  signinSchema,
  signupSchema,
  contactSchema,
  resetPasswordSchema,
  updateProfileSchema,
  forgetPasswordSchema,
  updatePasswordSchema,
} from "@/libs/schemas/schema.auth";

// 🔐 Schema Map
export const schemaMap = {
  signin: signinSchema,
  signup: signupSchema,
  contact: contactSchema,
  forgetPassword: forgetPasswordSchema,
  resetPassword: resetPasswordSchema,
  updatePassword: updatePasswordSchema,
  updateProfile: updateProfileSchema,
};

export type SchemaKey = keyof typeof schemaMap;
export type SchemaType<K extends SchemaKey> = z.infer<(typeof schemaMap)[K]>;

// 🧑‍💻 Form Components
export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("signin");
  const { signinUser } = useSession();

  const onSubmit = async (data: SchemaType<SchemaKey>): Promise<void> => {
    console.log("Signin submitted:", data);
    signinUser(data as SchemaType<"signin">);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.signin}
          register={register}
          control={control}
          errors={errors}
          className="mt-6 "
        />
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.signin.submit?.onSubmitLabel
              : AuthForm.signin.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("signup");
  const { signupUser } = useSession();

  const onSubmit = async (data: SchemaType<SchemaKey>) => {
    console.log("Signin submitted:", data);
    signupUser(data as SchemaType<"signup">);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.signup}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.signup.submit?.onSubmitLabel
              : AuthForm.signup.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("contact");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("Contact submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.contact}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.contact.submit?.onSubmitLabel
              : AuthForm.contact.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("forgetPassword");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("ForgetPassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.forgetPassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.forgetPassword.submit?.onSubmitLabel
              : AuthForm.forgetPassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("resetPassword");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("ResetPassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.resetPassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.resetPassword.submit?.onSubmitLabel
              : AuthForm.resetPassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("updatePassword");

  const onSubmit = (data: SchemaType<SchemaKey>) => {
    console.log("UpdatePassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.updatePassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.updatePassword.submit?.onSubmitLabel
              : AuthForm.updatePassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const UpdateProfileForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("updateProfile");

  const onSubmit = (data: SchemaType<SchemaKey>) => {
    console.log("UpdateProfile submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.updateProfile}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.updateProfile.submit?.onSubmitLabel
              : AuthForm.updateProfile.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};
