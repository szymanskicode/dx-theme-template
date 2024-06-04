import React from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { PublicClientApplication } from "@azure/msal-browser";

import List from "devextreme-react/list";
import { TreeViewTypes } from "devextreme-react/tree-view";
import { ButtonTypes } from "devextreme-react/button";
import { AxiosInstance } from "axios";

export interface AppProps {
  msalInstance: PublicClientApplication;
  appInsights: {
    ai: ApplicationInsights;
    reactPlugin: ReactPlugin;
  };
}

export interface AppHeaderProps {
  menuToggleEnabled: boolean;
  title?: string;
  toggleMenu: (e: ButtonTypes.ClickEvent) => void;
  className?: string;
}

export interface SideNavigationMenuProps {
  selectedItemChanged: (e: TreeViewTypes.ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: TreeViewTypes.ContentReadyEvent) => void;
}

export interface ProfilePanelProps {
  menuMode: "context" | "list";
}

export interface UserMenuSectionProps {
  showAvatar?: boolean;
  listRef?: React.RefObject<List>;
}

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  avatarImg?: string;
}

export type Fetchers = { odata: AxiosInstance; graph: AxiosInstance; axios: AxiosInstance };
export type GetFetcherProps = "graph" | "odata" | "axios";

export type AuthContextType = {
  user?: User;
  fetchers?: Fetchers;
  signIn: () => void;
  signOut: () => void;
  getAccessToken: (scopes: string[]) => Promise<string>;
  loading: boolean;
};

export interface SideNavToolbarProps {
  title: string;
}

export interface SingleCardProps {
  title?: string;
  description?: string;
}

export interface BlankProps {
  title?: string;
  description?: string;
}

export type Handle = () => void;

interface NavigationData {
  currentPath: string;
}

export type NavigationContextType = {
  setNavigationData?: ({ currentPath }: NavigationData) => void;
  navigationData: NavigationData;
};
