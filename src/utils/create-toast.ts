import Notify from "devextreme/ui/notify";
import { ToastType } from "devextreme/ui/toast";

interface ToastProps {
  message: string;
  type: ToastType;
}

export const createToast = ({ message, type }: ToastProps) => {
  Notify(
    {
      message,
      width: "auto",
      minWidth: 150,
      type,
      displayTime: 3500,
      animation: {
        show: {
          type: "fade",
          duration: 400,
          from: 0,
          to: 1,
        },
        hide: { type: "fade", duration: 40, to: 0 },
      },
    },
    {
      position: "bottom center",
      direction: "up-push",
    }
  );
};
