import { toast } from "sonner";

export const sendToast = (message: string, isError = false) => {
  if (isError) {
    toast.error(message);
    return;
  }
  toast(message);
};
