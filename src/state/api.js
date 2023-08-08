import { Server } from "../utils/config";

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Server.endpoint || "/",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: "appwriteApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `api/general/user/${id}`,
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
        url: `api/user/signin`,
        method: "POST",
        body: { email, password },
      }),
      providesTags: ["Signin"],
      invalidatesTags: ["User"],
    }),
    userSignup: build.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: `api/user/signup`,
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
      providesTags: ["Signup"],
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = api;
