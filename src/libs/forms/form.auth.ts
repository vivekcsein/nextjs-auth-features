import { InputType } from "@/types/app";
export interface FormInputType {
  id: string;
  label: string;
  type: InputType;
  placeholder: string;
  options?: { label: string; value: string }[];
  required: boolean;
  errorMessage: string;
}
export interface ReferToType {
  link: string;
  label: string;
}
export interface SubmitType {
  label: string;
  onSubmitLabel: string;
}
export interface FormListType {
  title: string;
  description: string;
  icon?: string;
  submit?: SubmitType;
  referTo?: ReferToType;
  formInputs: FormInputType[];
}

export interface AuthFormType {
  signin: FormListType;
  signup: FormListType;
  forgetPassword: FormListType;
  resetPassword: FormListType;
  updatePassword: FormListType;
  updateProfile: FormListType;
  contact: FormListType;
}

const AuthForm: AuthFormType = {
  signin: {
    title: "Sign In",
    description: "Please fill in the following information",
    icon: "User",
    submit: {
      label: "Sign In",
      onSubmitLabel: "Signing In",
    },
    referTo: {
      link: "signup",
      label: "dont have an account?",
    },
    formInputs: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        errorMessage: "Please enter your email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
        errorMessage: "Please enter your password",
      },
      {
        id: "remember",
        label: "Remember me",
        type: "checkbox",
        placeholder: "Remember me",
        required: false,
        errorMessage: "Please enter your remember me",
      },
    ],
  },
  signup: {
    title: "Sign Up",
    description: "Please fill in the following information",
    icon: "UserPlus",
    submit: {
      label: "Sign Up",
      onSubmitLabel: "Signing Up",
    },
    referTo: {
      link: "signin",
      label: "already have an account?",
    },
    formInputs: [
      {
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
        errorMessage: "Please enter your full name",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        required: true,
        errorMessage: "Please enter your email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        required: true,
        errorMessage: "Please enter your password",
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm password",
        required: true,
        errorMessage: "Please confirm your password",
      },
      {
        id: "terms",
        label: "Terms and Conditions",
        type: "checkbox",
        placeholder: "I agree to the terms and conditions",
        required: true,
        errorMessage: "Please agree to the terms and conditions",
      },
    ],
  },
  forgetPassword: {
    title: "Forgot Password",
    description: "Please fill in the following information",
    icon: "KeyRound",
    formInputs: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        required: true,
        errorMessage: "Please enter your email",
      },
    ],
  },
  resetPassword: {
    title: "Reset Password",
    description: "Please fill in the following information",
    icon: "KeySquare",
    formInputs: [
      {
        id: "token",
        label: "Token",
        type: "text",
        placeholder: "Enter token",
        required: true,
        errorMessage: "Please enter your token",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        required: true,
        errorMessage: "Please enter your password",
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm password",
        required: true,
        errorMessage: "Please confirm your password",
      },
    ],
  },
  updatePassword: {
    title: "Update Password",
    description: "Please fill in the following information",
    icon: "KeySquare",
    formInputs: [
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        required: true,
        errorMessage: "Please enter your password",
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm password",
        required: true,
        errorMessage: "Please confirm your password",
      },
    ],
  },
  updateProfile: {
    title: "Update Profile",
    description: "Please fill in the following information",
    icon: "UserPen",
    formInputs: [
      {
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
        errorMessage: "Please enter your full name",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email",
        required: true,
        errorMessage: "Please enter your email",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    description: "Please fill in the following information",
    icon: "Mail",
    submit: {
      label: "Contact Us",
      onSubmitLabel: "Contacting Us",
    },
    formInputs: [
      {
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
        errorMessage: "Please enter your full name",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email",
        required: true,
        errorMessage: "Please enter your email",
      },
      {
        id: "topic",
        label: "Topic",
        type: "text",
        placeholder: "Enter topic",
        required: true,
        errorMessage: "Please enter your topic",
      },
      {
        id: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Enter message",
        required: true,
        errorMessage: "Please enter your message",
      },
      {
        id: "newsletter",
        label: "Newsletter",
        type: "checkbox",
        placeholder: "Subscribe to newsletter",
        required: false,
        errorMessage: "Please subscribe to newsletter",
      },
    ],
  },
};

export default AuthForm;
