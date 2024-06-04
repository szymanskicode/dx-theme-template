import axios, { AxiosInstance } from "axios";
import { IPublicClientApplication } from "@azure/msal-browser";
import { handleError } from "../utils/handle-error";

import { graphApiScopes, oDataApiScopes } from "./settings";

import type { Fetchers } from "../types/types";

export const createFetchers = async (instance: IPublicClientApplication): Promise<Fetchers | null> => {
  try {
    const oDataFetcher = await initializeApi(
      instance, //
      oDataApiScopes.scopes,
      process.env.REACT_APP_ODATA_API_BASE_URL!
    );

    const graphFetcher = await initializeApi(
      instance, //
      graphApiScopes.scopes,
      process.env.REACT_APP_GRAPH_API_BASE_URL!
    );

    return { odata: oDataFetcher, graph: graphFetcher, axios };
  } catch (error) {
    handleError({
      comment: "Unable to create fetchers!", //
      error,
      showToast: false,
      isTrackable: false,
    });
    return null;
  }
};

async function initializeApi(
  clientApplication: IPublicClientApplication, //
  tokenScopes: string[],
  baseUrl: string
): Promise<AxiosInstance> {
  const axiosInstance = axios.create();

  axiosInstance.defaults.baseURL = baseUrl;
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return await configureAxiosInstance(clientApplication, axiosInstance, tokenScopes);
}

async function configureAxiosInstance(
  clientApplication: IPublicClientApplication, //
  axiosInstance: AxiosInstance,
  tokenScopes: string[]
): Promise<AxiosInstance> {
  axiosInstance.interceptors.request.use(
    async (req) => {
      const apiToken = await clientApplication
        .acquireTokenSilent({
          scopes: tokenScopes,
          account: clientApplication.getAllAccounts()[0],
        })
        .catch((error) => {
          handleError({
            comment: "Interceptor: Failed to obtain the API Token with acquireTokenSilent.", //
            error,
            showToast: false,
            isTrackable: true,
            trackName: "AcquireTokenRedirect",
            trackProperties: { scopes: tokenScopes },
          });

          clientApplication.acquireTokenRedirect({
            scopes: tokenScopes,
            account: clientApplication.getAllAccounts()[0],
          });
        });

      if (apiToken) {
        req.headers.Authorization = `Bearer ${apiToken.accessToken}`;
      } else {
        handleError({
          comment: "Interceptor: Failed to obtain the API Token with acquireTokenSilent and acquireTokenRedirect.", //
          error: null,
          showToast: false,
          isTrackable: true,
          trackName: "EmptyToken",
          trackProperties: { message: "Failed to obtain the token." },
        });
      }

      return req;
    },
    (error) => {
      handleError({
        comment: "Interceptor: Failed.", //
        error: null,
        showToast: false,
        isTrackable: true,
        trackName: "EmptyToken",
        trackProperties: { message: "Failed to obtain the token." },
      });

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
