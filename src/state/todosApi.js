import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "../utils/config";
import { api } from "./api";
import { userIdSelector } from "./authSlice";
import { Permission, Role } from "appwrite";

export const todosApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () =>
        `/databases/${Server.todosDB}/collections/${Server.todosCollection}/documents`,
      transformResponse: (data) => {
        return data?.documents || [];
      },
      providesTags: ["Todos"],
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
