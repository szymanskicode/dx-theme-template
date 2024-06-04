import "./dashboard.scss";
import { useEffect, useState } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useUserApi } from "../../api/useUserApi";

export const Dashboard = () => {
  const userApi = useUserApi();
  const [currentUserData, setCurrentUserData] = useState<any>();

  useEffect(() => {
    (async () => {
      const { data, error } = await userApi.getCurrentUser();

      if (error) {
        console.log(error);
      }

      if (data) {
        setCurrentUserData(data);
      }
    })();
  }, []);

  return (
    <div className="view-host dashboard">
      <div className="view-wrapper">
        <Toolbar className={`theme-dependent ${false ? "scrolled" : ""}`}>
          <Item location="before">
            <div className="header-text">Dashboard</div>
          </Item>
        </Toolbar>
        {/* Content goes here... */}
      </div>
    </div>
  );
};
