import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    console.log("login...");
    const response = await api.login(email, password);
    // console.log(response);
    return response;
  }
);

export const logout = createAsyncThunk("users/logoutUser", async () => {
  const response = await api.logout();
  // console.log(response);
  return response;
});

export const register = createAsyncThunk(
  "users/registerUser",
  async ({ email, password, name }) => {
    const response = await api.register(email, password, name);
    // console.log(response);
    return response;
  }
);

export const loginWith = createAsyncThunk(
  "users/loginWith",
  async ({ provider }) => {
    const response = await api.provider().account.createOAuth2Session(provider);
    console.log(response);
    return response;
  }
);

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await api.provider().account.get();
  // console.log(response);
  return response;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { userId, reaction } = action.payload;
      const existingUser = state.users.find((user) => user.id === userId);
      if (existingUser) {
        existingUser.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      });
  },
});

export default usersSlice.reducer;
