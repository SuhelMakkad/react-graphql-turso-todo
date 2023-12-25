import axios from "axios";
import { apiBaseUrl } from "@/utils/route";
import type { UserSchema } from "@/utils/auth";

export const authenticate = async (email: string, password: string) => {
  const reqUrl = apiBaseUrl + "/auth/login";

  try {
    const res = await axios.get(reqUrl, {
      params: {
        email,
        password,
      },
    });

    return res.data.jwt as string;
  } catch (e) {
    console.error(e);
  }
};

export const createAccount = async (params: UserSchema) => {
  const reqUrl = apiBaseUrl + "/auth/sign-up";

  try {
    const res = await axios.post(reqUrl, params);

    return res.data.jwt as string;
  } catch (e) {
    console.error(e);
  }
};
