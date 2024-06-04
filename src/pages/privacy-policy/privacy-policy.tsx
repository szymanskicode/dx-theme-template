import "./privacy-policy.scss";
import Toolbar, { Item } from "devextreme-react/toolbar";

export const PrivacyPolicy = () => {
  return (
    <div className="view-host privacy-policy">
      <div className="view-wrapper">
        <Toolbar className={`theme-dependent ${false ? "scrolled" : ""}`}>
          <Item location="before">
            <div className="header-text">Privacy Policy</div>
          </Item>
        </Toolbar>
        {/* Content goes here... */}
      </div>
    </div>
  );
};
