import { Server } from "../utils/config";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Server.endpoint || "/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("X-Appwrite-Project", Server.project);
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: "appwriteApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `/account`,
      providesTags: ["User"],
    }),
    userGoogleSignin: build.mutation({
      query: ({ accessToken, expiresIn }) => ({
        url: `/api/user/googleSignin`,
        method: "POST",
        body: { accessToken, expiresIn },
      }),
      providesTags: ["GoogleSignin"],
      invalidatesTags: ["User"],
    }),
    userSignin: build.mutation({
      query: ({ email, password }) => ({
        url: `/account/sessions/email`,
        method: "POST",
        body: { email, password },
      }),
      providesTags: ["Signin"],
      invalidatesTags: ["User"],
    }),
    userSignup: build.mutation({
      query: ({ name, email, password }) => ({
        url: `/account`,
        method: "POST",
        body: { name, email, password, userId: "unique()" },
      }),
      providesTags: ["Signup"],
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useUserSigninMutation, useUserSignupMutation } =
  api;
