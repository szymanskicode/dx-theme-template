import { createBrowserHistory } from "history";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

const history = createBrowserHistory();
const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_INSIGHTS_KEY,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history },
    },
  },
});

export const appInsights = { ai, reactPlugin };
