import React, { useState, useEffect, createContext, useContext, useCallback, useRef } from "react";
// import { useMsal } from "@azure/msal-react";
// import { useIsAuthenticated } from "@azure/msal-react";

import { msalScopes } from "../config/settings";
import { getUserGraphData, getUserGraphAvatar } from "../api/user";
import { createFetchers } from "../config/createFetchers";
import { DEFAULT_USER_IMG_URL } from "../config/constants";

import type { User, AuthContextType, Fetchers } from "../types/types";

function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchers, setFetchers] = useState<Fetchers>();

  // const { instance } = useMsal();
  // const isAuthenticated = useIsAuthenticated();
  const isLoggingOutRef = useRef(false);

  // const signIn = useCallback(async () => {
  //   setLoading(true);
  //   instance.loginRedirect({
  //     scopes: msalScopes,
  //   });
  // }, [instance]);

  // const signOut = useCallback(async () => {
  //   setLoading(true);
  //   isLoggingOutRef.current = true;
  //   setTimeout(() => {
  //     instance.logoutRedirect();
  //   }, 500);
  // }, [instance]);

  // const getAccessToken = useCallback(async (): Promise<string> => {
  //   const account: any = instance.getActiveAccount();
  //   const data = await instance.acquireTokenSilent({ scopes: msalScopes, account });
  //   return data.accessToken;
  // }, [instance]);

  // useEffect(() => {
  //   if (isLoggingOutRef.current) return;

  //   (async function () {
  //     const createdFetchers = await createFetchers(instance);
  //     const currentAccount = await instance.getActiveAccount();

  //     if (!createdFetchers) return;

  //     !fetchers && setFetchers(createdFetchers);

  //     if (currentAccount && isAuthenticated && fetchers) {
  //       const accessToken = await getAccessToken();

  //       // TODO: Refactor this calls to use fetchers
  //       const userGraphData = await getUserGraphData(accessToken);
  //       const userGraphAvatar = await getUserGraphAvatar(accessToken);

  //       setUser({
  //         name: userGraphData.data.displayName,
  //         email: userGraphData.data.mail,
  //         avatarUrl: DEFAULT_USER_IMG_URL,
  //         avatarImg: userGraphAvatar.data,
  //       });
  //     } else {
  //       setUser(undefined);
  //     }

  //     setLoading(!instance || !fetchers);
  //   })();
  // }, [instance, isAuthenticated, getAccessToken, fetchers]);

  useEffect(() => {
    setUser({
      name: "TEST",
      email: "TEST",
      avatarUrl: DEFAULT_USER_IMG_URL,
      avatarImg: "",
    });

    setLoading(false);
  }, []);

  const signIn = () => {};
  const signOut = () => {};
  const getAccessToken = async (str: any) => {
    return str;
  };

  return <AuthContext.Provider value={{ user, signIn, signOut, getAccessToken, fetchers, loading }} {...props} />;
}

const AuthContext = createContext<AuthContextType>({ loading: false } as AuthContextType);

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
