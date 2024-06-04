import React, { useEffect, useState } from "react";

import Form, { Item as FormItem, GroupItem, ColCountByScreen } from "devextreme-react/form";
import { User } from "../../../types/users";
import { FormTextbox, FormPhotoUploader } from "../..";
import { EmailRule } from "devextreme-react/validator";
import { getSizeQualifier } from "../../../utils/media-query";

export const UserNewForm = ({ initData, onDataChanged }: { initData: User; onDataChanged: (data: any) => void }) => {
  const [newUserData, setNewUserData] = useState<User>({ ...initData });

  useEffect(() => {
    setNewUserData({ ...initData });
  }, [initData]);

  const updateField = (field: string) => (value: string) => {
    const newData = { ...newUserData, ...{ [field]: value } };

    onDataChanged(newData);
    setNewUserData(newData);
  };

  return (
    <Form className="plain-styled-form" screenByWidth={getSizeQualifier}>
      <GroupItem>
        <ColCountByScreen xs={1} sm={1} md={1} lg={1} />
        <FormItem>
          <FormPhotoUploader />
        </FormItem>
      </GroupItem>

      <GroupItem>
        <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
        <FormItem>
          <FormTextbox label="First Name" value={newUserData.firstName} isEditing={false} onValueChange={updateField("firstName")} />
        </FormItem>
        <FormItem>
          <FormTextbox label="Last Name" value={newUserData.lastName} isEditing={false} onValueChange={updateField("lastName")} />
        </FormItem>
        <FormItem>
          <FormTextbox label="Company" value={newUserData.company} isEditing={false} onValueChange={updateField("company")} />
        </FormItem>
        <FormItem>
          <FormTextbox label="Position" value={newUserData.position} isEditing={false} onValueChange={updateField("position")} />
        </FormItem>
      </GroupItem>

      <GroupItem cssClass="user-fields-group">
        <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
        <FormItem>
          <FormTextbox value={newUserData.manager} label="Assigned to" isEditing={false} onValueChange={updateField("manager")} />
        </FormItem>
        <FormItem>
          <FormTextbox value={newUserData.phone} isEditing={false} onValueChange={updateField("phone")} icon="tel" label="Phone" mask="+1(000)000-0000" />
        </FormItem>
        <FormItem>
          <FormTextbox value={newUserData.email} onValueChange={updateField("email")} isEditing={false} label="Email" icon="email">
            <EmailRule />
          </FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox value={newUserData.address} isEditing={false} onValueChange={updateField("address")} icon="home" label="Address" />
        </FormItem>
      </GroupItem>
    </Form>
  );
};
