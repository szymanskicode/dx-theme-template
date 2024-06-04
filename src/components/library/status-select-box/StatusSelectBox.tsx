import "./StatusSelectBox.scss";
import React from "react";
import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import type { EditorStyle, LabelMode } from "devextreme-react/common";
import { UserStatus } from "../../utils/user-status/UserStatus";
import { USER_STATUS_LIST } from "../../../config/constants";

interface StatusSelectBoxProps {
  value: string;
  readOnly?: boolean;
  stylingMode?: EditorStyle;
  labelMode?: LabelMode | undefined;
  onValueChange: (value: any) => void;
}

const FieldRender = (data: any) => {
  return (
    <div className="status-editor-field">
      <UserStatus text={data} showText={false} contentClass="status-indicator" />
      <TextBox className={`status-${data?.toLowerCase()}`} value={data} hoverStateEnabled={false} inputAttr={{ class: "status-input", statusEditorInput: "" }} readOnly />
    </div>
  );
};

const ItemRender = (item: any) => {
  return (
    <div>
      <UserStatus text={item} />
    </div>
  );
};

export const StatusSelectBox = ({ value, readOnly, stylingMode, labelMode, onValueChange }: StatusSelectBoxProps) => {
  return (
    <SelectBox
      label="Status"
      value={value}
      items={USER_STATUS_LIST}
      onValueChange={onValueChange}
      itemRender={ItemRender}
      readOnly={readOnly}
      stylingMode={stylingMode}
      labelMode={labelMode}
      width="100%"
      fieldRender={FieldRender}
    />
  );
};
