import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button, ButtonTypes } from "devextreme-react/button";
import { ScrollView } from "devextreme-react/scroll-view";
import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";
import Form, { Item as FormItem, GroupItem, ColCountByScreen } from "devextreme-react/form";
import Accordion, { Item as AccordionItem } from "devextreme-react/accordion";
import { formatNumber } from "devextreme/localization";
import { User } from "../../../types/users";
import { CardActivities } from "../card-activities/CardActivities";
import { FormTextbox, FormPhoto, UserStatus } from "../..";
import { useScreenSize } from "../../../utils/media-query";
import ValidationGroup from "devextreme-react/validation-group";

const renderCustomTitle = (item: any) => {
  return (
    <>
      <span>{item.title}</span>
    </>
  );
};

const formatPrice = (price: number) => {
  return formatNumber(price, {
    type: "currency",
    currency: "USD",
  });
};

export const UserPanelDetails = ({
  user,
  isOpened,
  changePanelOpened,
  onDataChanged,
  changePanelPinned,
}: {
  user: User;
  isOpened: boolean;
  changePanelOpened: (value: boolean) => void;
  onDataChanged: (data: any) => void;
  changePanelPinned: () => void;
}) => {
  const [isPinned, setIsPinned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLarge, isMedium } = useScreenSize();

  const navigate = useNavigate();

  const updateField = (field: string) => (value: any) => {
    onDataChanged({ ...user, ...{ [field]: value } });
  };

  useEffect(() => {
    changePanelPinned();
  }, [isPinned]);

  const onPinClick = useCallback(() => {
    setIsPinned(!isPinned);
  }, [isPinned]);

  const onClosePanelClick = useCallback(() => {
    setIsPinned(false);
    changePanelOpened(false);
  }, []);

  const toggleEditHandler = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const onSaveClick = useCallback(({ validationGroup }: ButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    setIsEditing(!isEditing);
  }, []);

  const navigateToDetails = useCallback(() => {
    navigate("/users-details");
  }, []);

  const renderCustomOpportunities = useCallback(() => {
    return user.opportunities?.map((item, idx) => {
      return (
        <div className="opportunities" key={idx}>
          <span className="value">{item.name}</span>
          <br />
          <span className="value black small">{formatPrice(item.price)}</span>
        </div>
      );
    });
  }, [user]);

  const renderCustomActivities = useCallback(() => {
    return <CardActivities activities={user.activities} />;
  }, [user]);

  return (
    <div id="user-panel" className={classNames({ panel: true, open: isOpened, pin: isPinned && (isLarge || isMedium) })}>
      <div className="data-wrapper">
        <Toolbar className="panel-toolbar">
          <ToolbarItem location="before">
            <span className="user-name value">{user.name}</span>
          </ToolbarItem>
          <ToolbarItem location="before">
            <UserStatus text={user.status} />
          </ToolbarItem>
          <ToolbarItem location="after" visible={isLarge || isMedium}>
            <Button icon={isPinned ? "pin" : "unpin"} stylingMode="text" onClick={onPinClick} />
          </ToolbarItem>
          <ToolbarItem location="after">
            <Button icon="close" stylingMode="text" onClick={onClosePanelClick} />
          </ToolbarItem>
        </Toolbar>
        <ScrollView className="panel-scroll">
          <ValidationGroup>
            <div className="data-part border">
              <Form className={classNames({ "plain-styled-form": true, "view-mode": !isEditing })}>
                <GroupItem colCount={2} cssClass="photo-row">
                  <ColCountByScreen xs={2} />
                  <FormItem cssClass="photo-box">
                    <FormPhoto link={user.image} size={124} />
                  </FormItem>
                  <GroupItem>
                    <FormItem cssClass="accent">
                      <FormTextbox label="Company" value={user.company} isEditing={!isEditing} onValueChange={updateField("company")} />
                    </FormItem>
                    <FormItem>
                      <FormTextbox label="Position" value={user.position} isEditing={!isEditing} onValueChange={updateField("position")} />
                    </FormItem>
                    <FormItem cssClass="accent">
                      <FormTextbox label="Assigned to" value={user.manager} isEditing={!isEditing} onValueChange={updateField("manager")} />
                    </FormItem>
                  </GroupItem>
                </GroupItem>

                <GroupItem cssClass="user-fields-group">
                  <FormItem>
                    <FormTextbox value={user.phone} isEditing={!isEditing} onValueChange={updateField("phone")} icon="tel" mask="+1(000)000-0000" />
                  </FormItem>
                  <FormItem>
                    <FormTextbox value={user.email} isEditing={!isEditing} onValueChange={updateField("email")} icon="email" />
                  </FormItem>
                  <FormItem>
                    <FormTextbox value={user.address} isEditing={!isEditing} onValueChange={updateField("address")} icon="home" />
                  </FormItem>
                </GroupItem>
              </Form>
            </div>

            <div className="data-part data-part-toolbar border">
              <Toolbar>
                <ToolbarItem location="after" visible={!isEditing}>
                  <Button icon="edit" text="Edit" stylingMode="contained" type="default" onClick={toggleEditHandler} />
                </ToolbarItem>
                <ToolbarItem location="after" visible={!isEditing}>
                  <Button text="Details" stylingMode="outlined" type="normal" onClick={navigateToDetails} />
                </ToolbarItem>
                <ToolbarItem location="after" visible={isEditing}>
                  <Button text="Save" icon="save" stylingMode="contained" type="default" onClick={onSaveClick} />
                </ToolbarItem>
                <ToolbarItem location="after" visible={isEditing}>
                  <Button text="Cancel" stylingMode="outlined" type="normal" onClick={toggleEditHandler} />
                </ToolbarItem>
                <ToolbarItem
                  location="before"
                  widget="dxDropDownButton"
                  options={{
                    text: "Actions",
                    stylingMode: "text",
                    dropDownOptions: { width: "auto" },
                    width: "auto",
                    items: ["Call", "Send Fax", "Send Email", "Make a Meeting"],
                  }}
                />
              </Toolbar>
            </div>
          </ValidationGroup>
          <div className="data-part">
            <Accordion multiple collapsible itemTitleRender={renderCustomTitle}>
              <AccordionItem title="Opportunities" render={renderCustomOpportunities} />
              <AccordionItem title="Activities" render={renderCustomActivities} />
            </Accordion>
          </div>
        </ScrollView>
      </div>
    </div>
  );
};
