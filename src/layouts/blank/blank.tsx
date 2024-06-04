import React from "react";
import ScrollView from "devextreme-react/scroll-view";

import type { BlankProps } from "../../types/types";

import "./blank.scss";

export const Blank = ({ title, description, children }: React.PropsWithChildren<BlankProps>) => {
  return (
    <ScrollView height="100%" width="100%" className="view-wrapper-scroll blank">
      {children}
    </ScrollView>
  );
};
