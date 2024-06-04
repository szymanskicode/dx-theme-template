import { AxiosInstance } from "axios";

import { useAuth } from "../contexts/auth";

import type { GetFetcherProps } from "../types/types";

export const useFetcher = (type: GetFetcherProps): AxiosInstance => {
  const auth = useAuth();

  switch (type) {
    case "graph":
      return auth.fetchers?.graph!;
    case "odata":
      return auth.fetchers?.odata!;
    default:
    case "axios":
      return auth.fetchers?.axios!;
  }
};
