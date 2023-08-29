import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "../utils/config";
import { api } from "./api";
import appwriteApi from "../api/api";
import { userIdSelector } from "./authSlice";
import { Permission, Query, Role } from "appwrite";

export const todosApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ offset, pageSize, sort, filters } = {}) => {
        const qs = appwriteApi.prepareQueryFilters({
          offset,
          pageSize,
          sort,
          filters,
        });
        const q = qs.length > 0 ? `?${qs.join("&")}` : "";
        return {
          url: `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents${q}`,
        };
      },
      // transformResponse: (data) => {
      //   return data?.documents || [];
      // },
      providesTags: ["Todos"],
    }),
    getTodo: builder.query({
      query: (id) => {
        return {
          url: `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents/${id}`,
        };
      },
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: ({ data, documentId = "unique()", permissions }) => ({
        url: `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents`,
        method: "POST",
        body: { data, documentId, permissions },
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents/${id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;

export const selectTodosResult = todosApiSlice.endpoints.getTodos.select();

export const addTodoApi = createAsyncThunk(
  "todos/addTodo",
  async ({ data: { content, isComplete }, addTodoMutation }, { getState }) => {
    const state = getState();
    const userId = userIdSelector(state);
    const response = await addTodoMutation({
      data: { content, isComplete, userId },
      permissions: [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
      ],
    });
    return response;
  }
);

export const queryTodoApi = createAsyncThunk(
  "todos/queryTodo",
  async ({ limit, offset } = {}) => {
    console.log(limit);
    const response = await appwriteApi.listDocuments(
      Server.todosDB,
      Server.todosCollection,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  }
);
