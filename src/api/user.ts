import axios, { AxiosInstance } from "axios";
import { Buffer } from "buffer";

export async function getUser() {
  try {
    // Send request
    return {
      isOk: true,
      data: "UserData",
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export const testGet = (fetcher: AxiosInstance) => {
  return fetcher
    .get("odata/me")
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Test error");
    });
};

export const getUserGraphData = (accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  return axios
    .get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: bearer,
      },
    })
    .then(async (response) => {
      return {
        data: response.data, //
        error: null,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        data: null, //
        error,
      };
    });
};

export const getUserGraphAvatar = (accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  return axios
    .get("https://graph.microsoft.com/beta/me/photo/$value", {
      headers: {
        Authorization: bearer,
      },
      responseType: "arraybuffer",
    })
    .then((response) => {
      const buffer = Buffer.from(response.data);
      const base64String = buffer.toString("base64");

      return {
        data: base64String,
        error: undefined,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        data: undefined,
        error,
      };
    });
};

export async function createAccount(email: string, password: string) {
  try {
    // Send request
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email: string, recoveryCode?: string) {
  try {
    // Send request
    return {
      isOk: true,
      data: { email },
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email: string) {
  try {
    // Send request
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
