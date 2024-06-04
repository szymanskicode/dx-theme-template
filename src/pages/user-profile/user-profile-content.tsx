import "./user-profile.scss";
import React, { useCallback } from "react";
import notify from "devextreme/ui/notify";
import Button from "devextreme-react/button";
import ScrollView from "devextreme-react/scroll-view";

import { FormPhoto } from "../../components";
import { ProfileCard, ProfileCardItem } from "../../components/library/profile-card/ProfileCard";
import { withLoadPanel } from "../../utils/withLoadPanel";
import { useScreenSize } from "../../utils/media-query";

type UserProfileContentProps = {
  basicInfoItems: ProfileCardItem[];
  userItems: ProfileCardItem[];
  addressItems: ProfileCardItem[];
  profileData: Record<string, string>;
  handleDataChanged: () => void;
  handleChangePasswordClick: () => void;
  handleContentScrolled: (value: boolean) => void;
};

const copyToClipboard = (text: string) => (evt: any) => {
  window.navigator.clipboard?.writeText(text);
  const tipText = "Text copied";
  notify(
    {
      message: tipText,
      minWidth: `${tipText.length + 2}ch`,
      width: "auto",
      position: { of: evt.element, offset: "0 -30" },
    },
    "info",
    500
  );
};

const formatPhone = (value: any) => {
  return String(value).replace(/(\d{3})(\d{3})(\d{4})/, "+1($1)$2-$3");
};

const UserProfileContent = ({
  basicInfoItems,
  userItems,
  addressItems,
  profileData,
  handleDataChanged,
  handleChangePasswordClick,
  handleContentScrolled,
}: UserProfileContentProps) => {
  const { isXSmall } = useScreenSize();

  const onScroll = useCallback(
    (reachedTop: any) => {
      handleContentScrolled(reachedTop);
    },
    [handleContentScrolled]
  );

  return (
    <ScrollView className="view-wrapper-scroll" onScroll={onScroll}>
      <div className="cards-container">
        <ProfileCard wrapperCssClass="profile-card basic-info-card" title="Basic Info" colCount={4} cardData={profileData} items={basicInfoItems} onDataChanged={handleDataChanged}>
          <div className="basic-info-top-item profile-card-top-item">
            <FormPhoto link={profileData?.image} editable size={80} />
            <div>
              <div className="title-text">{profileData?.name}</div>
              <div className="subtitle-text with-clipboard-copy">
                <span>ID: {profileData?.id}</span>
                <Button
                  icon="copy"
                  className="copy-clipboard-button"
                  stylingMode="text"
                  onClick={copyToClipboard(profileData?.id)}
                  activeStateEnabled={false}
                  focusStateEnabled={false}
                  hoverStateEnabled={false}
                />
              </div>
              <Button text="Change Password" className="change-password-button" stylingMode="contained" icon={isXSmall ? void 0 : "lock"} onClick={handleChangePasswordClick} />
            </div>
          </div>
        </ProfileCard>

        <ProfileCard wrapperCssClass="profile-card users-card" title="Users" cardData={profileData} items={userItems} onDataChanged={handleDataChanged}>
          <div className="profile-card-top-item">
            <div className="image-wrapper">
              <i className="dx-icon dx-icon-mention" />
            </div>
            <div>
              <div className="title-text">{formatPhone(profileData?.phone)}</div>
              <div className="subtitle-text with-clipboard-copy">
                {profileData?.email}
                <Button
                  icon="copy"
                  className="copy-clipboard-button"
                  stylingMode="text"
                  onClick={copyToClipboard(profileData?.email)}
                  activeStateEnabled={false}
                  focusStateEnabled={false}
                  hoverStateEnabled={false}
                />
              </div>
            </div>
          </div>
        </ProfileCard>

        <ProfileCard wrapperCssClass="profile-card address-card" title="Address" cardData={profileData} items={addressItems} onDataChanged={handleDataChanged}>
          <div className="profile-card-top-item">
            <div className="image-wrapper">
              <i className="dx-icon dx-icon-map" />
            </div>
            <div>
              <div className="title-text">
                {profileData?.address}, {profileData?.city}, {profileData?.state}, {profileData?.country}
              </div>
            </div>
          </div>
        </ProfileCard>
      </div>
    </ScrollView>
  );
};

export const UserProfileContentWithLoadPanel = withLoadPanel(UserProfileContent);
