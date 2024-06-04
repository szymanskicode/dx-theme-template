import { useFetcher } from "../hooks/useFetcher";

export const useUserApi = () => {
  const odataFetcher = useFetcher("odata");
  const graphFetcher = useFetcher("graph");
  const axiosFetcher = useFetcher("axios");

  function getCurrentUser() {
    return odataFetcher
      .get("odata/me")
      .then(async (response) => {
        return {
          data: response.data, //
          error: undefined,
        };
      })
      .catch((error) => {
        return {
          data: undefined, //
          error: error,
        };
      });
  }

  return {
    getCurrentUser,
  };
};
