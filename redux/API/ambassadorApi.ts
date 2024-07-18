// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../index"; // Define a service using a base URL and expected endpoints

// Define a service using a base URL and expected endpoints
export const ambassadorApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL  + "/api",
    prepareHeaders: (headers, { getState }) => {
      // Auto add authentification token to the header
      const token = (getState() as RootState).userInfos.accessToken;
      if (!headers.has("Authorization") && token != null) {
        headers.set("Authorization", `Ambassador ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Story", "Archive", 'School'],
  endpoints: () => ({}),
});
