import "./user-profile.scss";
import React, { useState, useCallback, useEffect } from "react";
import notify from "devextreme/ui/notify";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";

import { service } from "../../data/user-profile-service";
import { PageHeader } from "../../components";
import { ProfileCardItem } from "../../components/library/profile-card/ProfileCard";
import { ChangeProfilePasswordForm } from "../../components/library/change-profile-password-form/ChangeProfilePasswordForm";

import { UserProfileContentWithLoadPanel } from "./user-profile-content";

import { mockProfileData } from "../../config/mock-data";
import { mockSupervisorsList } from "../../config/mock-data";

export const UserProfile = () => {
  const [profileData, setProfileData] = useState<Record<string, string>>();
  const [savedProfileData, setSavedProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePasswordPopupOpened, setIsChangedPasswordPopupOpened] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [basicInfoItems, setBasicInfoItems] = useState<ProfileCardItem[]>([]);
  const [userItems, setUserItems] = useState<ProfileCardItem[]>([]);
  const [addressItems, setAddressItems] = useState<ProfileCardItem[]>([]);
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  const dataChanged = useCallback(() => {
    setIsDataChanged(true);
  }, []);

  const changePassword = useCallback(() => {
    setIsChangedPasswordPopupOpened(true);
  }, []);

  const handleContentScrolled = useCallback((reachedTop: any) => {
    setIsContentScrolled(!reachedTop);
  }, []);

  const setSavedData = useCallback(
    (data = profileData) => {
      setSavedProfileData(JSON.parse(JSON.stringify(data)));
    },
    [profileData]
  );

  const onCancel = useCallback(() => {
    setProfileData(savedProfileData);
    setSavedData();
    setIsDataChanged(false);
  }, [savedProfileData, setSavedData]);

  const onSave = useCallback(() => {
    notify(
      {
        message: "Data saved",
        position: {
          at: "bottom center",
          my: "bottom center",
        },
      },
      "success"
    );
    setIsDataChanged(false);
    setSavedData();
  }, [profileData, setSavedData]);

  useEffect(() => {
    // const supervisorsPromise = getSupervisors();
    // const profileDataPromise = getProfile(PROFILE_ID);

    // const supervisorsPromise = new Promise((res) => {
    //   res([]);
    // });
    // const profileDataPromise = new Promise((res) => {
    //   res([]);
    // });

    // supervisorsPromise.then((data) => {
    //   setUserItems(service.getUserItems(data));
    // });
    // profileDataPromise.then((data) => {
    //   setProfileData(undefined);
    //   setSavedData(undefined);
    // });

    // Promise.all([supervisorsPromise, profileDataPromise]).then(() => {
    //   setIsLoading(false);
    // });

    setUserItems(service.getUserItems(mockSupervisorsList));
    setProfileData(mockProfileData as any);
    setSavedData(mockProfileData as any);

    setIsLoading(false);

    setBasicInfoItems(service.getBasicInfoItems());
    setAddressItems(service.getAddressItems());
  }, []);

  return (
    <div className="view-host user-profile">
      <div className="view-wrapper">
        <PageHeader label={"User Profile"}>
          <Item location="after" locateInMenu="never">
            <Button className="cancel-button" text="Cancel" disabled={!isDataChanged} stylingMode="outlined" type="normal" onClick={onCancel} />
          </Item>
          <Item location="after" locateInMenu="never">
            <Button disabled={!isDataChanged} text="Save" icon="save" type="default" stylingMode="contained" onClick={onSave} />
          </Item>
        </PageHeader>

        <UserProfileContentWithLoadPanel
          basicInfoItems={basicInfoItems}
          userItems={userItems}
          addressItems={addressItems}
          profileData={profileData}
          handleChangePasswordClick={changePassword}
          handleDataChanged={dataChanged}
          handleContentScrolled={handleContentScrolled}
          hasData={!isLoading}
          loading={isLoading}
          panelProps={{
            container: ".view-wrapper",
            position: { of: ".content" },
          }}
        />
      </div>

      <ChangeProfilePasswordForm visible={isChangePasswordPopupOpened} setVisible={setIsChangedPasswordPopupOpened} />
    </div>
  );
};
