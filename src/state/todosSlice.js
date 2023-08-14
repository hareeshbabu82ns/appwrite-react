import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import { Server } from "../utils/config";
import { Permission, Role } from "appwrite";
import { userIdSelector } from "./authSlice";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await api.listDocuments(
    Server.todosDB,
    Server.todosCollection
  );
  return response.documents;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ content, isComplete }, { getState }) => {
    const state = getState();
    const userId = userIdSelector(state);
    const response = await api.createDocument(
      Server.todosDB,
      Server.todosCollection,
      null,
      { content, isComplete, userId },
      [Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
    );
    return response;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }) => {
    const response = await api.updateDocument(
      Server.todosDB,
      Server.todosCollection,
      id,
      data
    );
    return { response, id };
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await api.deleteDocument(
    Server.todosDB,
    Server.todosCollection,
    id
  );
  return { response, id };
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { todoId, reaction } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === todoId);
      if (existingTodo) {
        existingTodo.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched todos to the array
        state.todos = [...action.payload];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoOld = state.todos.find(
          (todo) => todo["$id"] === action.payload.id
        );
        if (todoOld) {
          const { isComplete, content } = action.payload.response;
          todoOld.isComplete = isComplete;
          todoOld.content = content;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex(
          (todo) => todo["$id"] === action.payload.id
        );
        if (idx >= 0) state.todos.splice(idx, 1);
      });
  },
});

export const { todoAdded, todoUpdated, reactionAdded } = todosSlice.actions;

export default todosSlice.reducer;

export const selectAllTodos = (state) => state.todos.todos;

export const selectTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo.id === todoId);
