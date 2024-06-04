import React from "react";

import "./UserStatus.scss";

export const UserStatus = ({ text, contentClass = "", showText = true }: { text: string; contentClass?: string; showText?: boolean }) => (
  <div className={`status status-user status-${text?.toLowerCase()} ${contentClass}`}>
    <span>{showText ? text : ""}</span>
  </div>
);
