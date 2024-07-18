import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_URL = `${BASE_URL}auth/`;

type apiData = {
  ok: boolean;
  result: object;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  }
}
export function useAPI() {
  const post = async (url:string, data: string|object) => {
    const response: apiData = await axios({
      method: "post",
      url: `${AUTH_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
        .then((response: { data: apiData }) => {
          return response.data;
        })
        .catch((error: any) => {
          console.error("useAPI hook error :",error);
          throw new Error(error);
        });
    return response;
  }

  return {post}
}
