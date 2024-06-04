import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { APP_TITLE } from "../config/constants";
import { appRoutes } from "../app-routes";

import { SideNavOuterToolbar as SideNavBarLayout } from "../layouts";

export const Content = () => {
  return (
    <SideNavBarLayout title={APP_TITLE}>
      <Routes>
        {appRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SideNavBarLayout>
  );
};
