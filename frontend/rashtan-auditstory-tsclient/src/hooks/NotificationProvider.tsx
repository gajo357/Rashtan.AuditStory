import { notification } from "antd";
import React, { useState, useContext } from "react";
import { useAuthContext } from "./AuthProvider";
import { UserError } from "./useApi";

interface ButtonProps {
  text: string;
  role?: string;
  handler?: () => void;
}

interface ToastProps {
  message: string;
  duration?: number;
  type?: "success" | "info" | "warning" | "error";
}

interface AlertProps {
  title?: string;
  message: string;
  buttons: ButtonProps[];
}

interface ContextProps {
  showToast: (p: ToastProps) => void;
  showSuccessToast: (message: string) => void;
  showAlert: (p: AlertProps) => void;
  handleError: (e: Error) => void;
  hideAlert: () => void;
  alert?: AlertProps;
}

const NotificationContext = React.createContext<ContextProps>({
  showToast: () => {},
  showSuccessToast: () => {},
  showAlert: () => {},
  handleError: _ => {},
  hideAlert: () => {}
});

const NotificationConsumer = NotificationContext.Consumer;
const useNotificationContext = () => {
  const { showAlert, showToast, showSuccessToast, handleError } = useContext(
    NotificationContext
  );
  return { showAlert, showToast, showSuccessToast, handleError };
};

const NotificationProvider: React.FC = ({ children }) => {
  const { ensureNoLoadingState } = useAuthContext();
  const [alert, setAlert] = useState<AlertProps>();

  const showAlert = (p: AlertProps) => {
    setAlert(p);
  };
  const showToast = (p: ToastProps) => {
    notification[p.type ? p.type : "info"]({
      message: p.message,
      duration: p.duration
    });
  };
  const showSuccessToast = (message: string) => {
    showToast({
      message: message,
      duration: 3000,
      type: "success"
    });
  };

  const handleError = (e: Error) => {
    ensureNoLoadingState();
    if (e instanceof UserError) {
      showAlert({
        title: `Greška`,
        message: e.message,
        buttons: [{ text: "OK" }]
      });
    } else {
      showAlert({
        title: `Greška`,
        message: e.message,
        buttons: [{ text: "OK" }]
      });
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        showAlert,
        showToast,
        showSuccessToast,
        handleError,
        hideAlert: () => {
          setAlert(undefined);
          console.log(alert);
        },
        alert
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationConsumer, useNotificationContext };
