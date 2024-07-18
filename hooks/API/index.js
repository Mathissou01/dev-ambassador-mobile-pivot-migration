import axios from "axios";
import { store } from "../../redux/index";
import { updateToken } from "../../redux/UserInfos/UserInfosSlice";

export async function fetchAPIwithToken(
  url,
  token = null,
  method = "GET",
  data = undefined,
  secondTry = false
) {
  const headers = {
    Accept: "application/json",
    Authorization: token
  };

  if (method !== "GET" && method !== "DELETE") {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url,
      method,
      timeout: 4000, // 4 seconds timeout
      headers,
      data
    });

    if (response.status > 300) {
      // Traitement pour les erreurs 403
    } else {
      return response.data;
    }
  } catch (error) {
    if (!secondTry) {
      const newTokens = await getNewToken();
      if (newTokens) {
        return await fetchAPIwithToken(url, 'Ambassador ' + newTokens.accessToken, method, data, true);
      }
      return null;
    } else {
      console.error("(index.js->fetchAPIwithToken():40)Error:", error);
      return null;
    }
  }
}


export async function getNewToken() {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const REFRESH_URL = `${BASE_URL}auth/refreshToken`;

  const userInfos = store.getState().userInfos;

  try {
    const response = await axios({
      url: REFRESH_URL,
      method: "POST",
      timeout: 4000, // 4 seconds timeout
      headers,
      data: {
        token: userInfos.permanentToken,
        userId: userInfos._id
      }
    });

    if (response.status > 300) {
      // Traitement pour les erreurs 403
    } else {
      const responseData = response.data;
      if (responseData.accessToken) {
        store.dispatch(updateToken(responseData.accessToken));
      }
      return responseData;
    }
  } catch (error) {
    console.error("(index.js->getNewToken():82) Error:", error);
    return null;
  }
}
