import React, { useRef, useCallback } from "react";
import DropDownButton from "devextreme-react/drop-down-button";
import { Template } from "devextreme-react/core/template";
import { UserMenuSection } from "../user-menu-section/UserMenuSection";
import type { ProfilePanelProps } from "../../../types/types";
import { useAuth } from "../../../contexts/auth";
import List from "devextreme-react/list";
import "./ProfilePanel.scss";

export const ProfilePanel = ({ menuMode }: ProfilePanelProps) => {
  const { user } = useAuth();
  const listRef = useRef<List>(null);

  const dropDownButtonAttributes = {
    class: "user-button",
  };

  const buttonDropDownOptions = {
    width: "auto",
  };

  const dropDownButtonContentReady = useCallback(
    ({ component }: any) => {
      component.registerKeyHandler("downArrow", () => {
        listRef.current?.instance.focus();
      });
    },
    [listRef]
  );

  return (
    <div className="user-panel">
      {menuMode === "context" && (
        <DropDownButton
          stylingMode="text"
          icon={user?.avatarImg ? `data:image/png;base64,${user?.avatarImg}` : "user"}
          showArrowIcon={false}
          elementAttr={dropDownButtonAttributes}
          dropDownOptions={buttonDropDownOptions}
          dropDownContentTemplate="dropDownTemplate"
          onContentReady={dropDownButtonContentReady}
        >
          <Template name="dropDownTemplate">
            <UserMenuSection listRef={listRef} />
          </Template>
        </DropDownButton>
      )}
      {menuMode === "list" && <UserMenuSection showAvatar />}
    </div>
  );
};
