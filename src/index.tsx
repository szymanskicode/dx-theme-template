import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import ReactDOM from "react-dom/client";
import { EventType, PublicClientApplication } from "@azure/msal-browser";

import { tryGetVersion } from "./utils/version";
import { appInsights } from "./utils/app-insights";
import { App } from "./App";

appInsights.ai.loadAppInsights();
appInsights.ai.context.application.ver = tryGetVersion();

const pca = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID!,
    authority: process.env.REACT_APP_AUTHORITY!,
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
});

pca.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    pca.setActiveAccount(event.payload.account);
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App msalInstance={pca} appInsights={appInsights} />
  // </React.StrictMode>
);
