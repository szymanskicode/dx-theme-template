import "./theme/styles/styles.scss";
import "./theme/theme";

import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import LoadPanel from "devextreme-react/load-panel";
import config from "devextreme/core/config";

import { useThemeContext, ThemeContext } from "./theme/theme";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import { Content } from "./components/Content";
import { UnauthenticatedContent } from "./components/UnauthenticatedContent";
import { ErrorBoundary } from "./utils/error-boundary";

import type { AppProps } from "./types/types";

config({ licenseKey: process.env.REACT_APP_DEVEXTREME_LICENCE_KEY });

function RootApp() {
  const { user, loading } = useAuth();

  const isAuthForm = ["auth", "reset-password", "create-account"].includes(useLocation().pathname);

  if (loading) {
    return <LoadPanel visible />;
  }

  if (user && !isAuthForm) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export const App: React.FC = () => {
  const screenSizeClass = useScreenSizeClass();
  const themeContext = useThemeContext();

  return (
    <Router>
      {/* <AppInsightsContext.Provider value={appInsights.reactPlugin}> */}
      <ThemeContext.Provider value={themeContext}>
        {/* <MsalProvider instance={msalInstance}> */}
        <ErrorBoundary>
          <AuthProvider>
            <NavigationProvider>
              <div className={`app ${screenSizeClass}`}>{themeContext.isLoaded ? <RootApp /> : null}</div>
            </NavigationProvider>
          </AuthProvider>
        </ErrorBoundary>
        {/* </MsalProvider> */}
      </ThemeContext.Provider>
      {/* </AppInsightsContext.Provider> */}
    </Router>
  );
};
