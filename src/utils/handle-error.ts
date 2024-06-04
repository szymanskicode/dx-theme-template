import { appInsights } from "./app-insights";
import { createToast } from "./create-toast";

import type { ToastType } from "devextreme/ui/toast";

type ErrorHandlerWithToastWithInsightsProps = {
  comment: string;
  error: any;
  showToast: true;
  toastMessage: string;
  toastType: ToastType;
  isTrackable: true;
  trackName: string;
  trackProperties?: {
    [key: string]: any;
  };
};

type ErrorHandlerWithToastWithoutInsightsProps = {
  comment: string;
  error: any;
  showToast: true;
  toastMessage: string;
  toastType: ToastType;
  isTrackable: false;
  trackName?: null;
  trackProperties?: null;
};

type ErrorHandlerWithoutToastWithInsightsProps = {
  comment: string;
  error: any;
  showToast: false;
  toastMessage?: null;
  toastType?: null;
  isTrackable: true;
  trackName: string;
  trackProperties?: {
    [key: string]: any;
  };
};

type ErrorHandlerWithoutToastWithoutInsightsProps = {
  comment: string;
  error: any;
  showToast: false;
  toastMessage?: null;
  toastType?: null;
  isTrackable: false;
  trackName?: null;
  trackProperties?: null;
};

type ErrorHandlerToastProps =
  | ErrorHandlerWithToastWithInsightsProps
  | ErrorHandlerWithToastWithoutInsightsProps
  | ErrorHandlerWithoutToastWithInsightsProps
  | ErrorHandlerWithoutToastWithoutInsightsProps;

export const handleError = ({
  comment, //
  error,
  showToast,
  toastMessage,
  toastType,
  isTrackable,
  trackName,
  trackProperties,
}: ErrorHandlerToastProps) => {
  // OVERRIDE PROPS IF ERROR IS SERVER RESPONSE ERROR
  if (error?.response?.status === 401) {
    showToast = true;
    toastType = "warning";
    toastMessage = "Authentication is required.";
    isTrackable = true;
    trackName = "401 Response Error";
    trackProperties = trackProperties ? { errorMessage: error.message, ...trackProperties } : { errorMessage: error.message };
  }

  if (error?.response?.status === 403) {
    showToast = true;
    toastType = "warning";
    toastMessage = "Insufficient permissions.";
    isTrackable = true;
    trackName = "403 Response Error";
    trackProperties = trackProperties ? { errorMessage: error.message, ...trackProperties } : { errorMessage: error.message };
  }

  // DISABLE TRACKING IF LOCALHOST
  if (process.env.REACT_APP_ENV === "local") isTrackable = false;

  // CONSOLE LOG ERROR
  console.info("From error handler:");
  console.error({
    comment, //
    error,
    errorMessage: error.message,
    isTrackable,
    showToast,
  });
  console.info("End.");

  // DISPLAY TOAST NOTIFICATION
  if (showToast) {
    createToast({ message: toastMessage || comment, type: toastType || "info" });
  }

  // TRACK ERROR IN APPINSIGHTS
  if (isTrackable) {
    let properties = { error, comment };
    if (trackProperties) {
      properties = { ...properties, ...trackProperties };
    }

    appInsights.ai.trackEvent({
      name: trackName || comment,
      properties,
    });
  }
};
