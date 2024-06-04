export const msalScopes = ["user.read"];

export const graphApiScopes = {
  name: "graphApiAxiosInstance",
  scopes: ["email", "profile", "user.read", "openid", "files.readWrite.all"],
};

export const oDataApiScopes = {
  name: "coreOData",
  scopes: [`${process.env.REACT_APP_API_SCOPE}`],
  enabled: true,
};
