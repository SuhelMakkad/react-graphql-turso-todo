import { apiBaseUrl } from "@/utils/route";
import axios from "axios";

export const authenticate = async (email: string, password: string) => {
  const reqUrl = apiBaseUrl + "/auth/login";

  try {
    const res = await axios.get(reqUrl, {
      params: {
        email,
        password,
      },
    });

    return res.data.jwt;
  } catch (e) {
    console.error(e);
  }
};
