import { ToastAndroid } from "react-native";

export const useToast = () => {
  return {
    show: (message: string) => {
      ToastAndroid.show(message, ToastAndroid.LONG);
    },
  };
};
