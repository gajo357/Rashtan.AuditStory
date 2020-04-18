import React from "react";
import { Modal, notification } from "antd";

export class UserError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status: number;
}

export class ValidationError extends Error {
  constructor(property: string, message: string) {
    super(message);
    this.property = property;
  }

  property: string;
}

// Error format coming from the backend
export interface ResponseError {
  property?: string;
  message: string;
}

const formatValidationError: React.FC<ValidationError> = (e) => {
  return (
    <div>
      <p>Invalid property: {e.property}</p>
      <p>{e.message}</p>
    </div>
  );
};

const formatUserError: React.FC<UserError> = (e) => {
  return (
    <div>
      <p>Error status: {e.status}</p>
      <p>{e.message}</p>
    </div>
  );
};

const formatUnknownError: React.FC<Error> = (e) => {
  return (
    <div>
      <p>Error name: {e.name}</p>
      <p>{e.message}</p>
      {e.stack && <p>{e.stack}</p>}
    </div>
  );
};

interface Info {
  type: "error" | "warning";
  title: string;
  content: React.ReactNode;
}

const getInfo: (e: Error) => Info = (e: Error) => {
  if (e instanceof ValidationError) {
    return {
      type: "warning",
      title: "Validation error",
      content: formatValidationError(e),
    };
  } else if (e instanceof UserError) {
    return {
      type: "error",
      title: "An error has occured",
      content: formatUserError(e),
    };
  } else {
    return {
      type: "error",
      title: "An error has occured",
      content: formatUnknownError(e),
    };
  }
};

const convertInfoToNotification = (info: Info) => ({
  message: info.title,
  description: info.content,
  duration: 3,
});

const show = (showError: (i: Info) => void, showWarning: (i: Info) => void) => (
  e: Error
) => {
  const info = getInfo(e);
  if (info.type === "error") showError(info);
  else if (info.type === "warning") showWarning(info);
};

const showError = show(Modal.error, Modal.warning);

const showNotification = show(
  (i) => notification["error"](convertInfoToNotification(i)),
  (i) => notification["warning"](convertInfoToNotification(i))
);

export { showError, showNotification };
