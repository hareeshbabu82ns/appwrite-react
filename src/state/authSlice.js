import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadingActions } from "./loadingSlice";
import api from "../api/api";
import { Server } from "../utils/config";

const initialState = {
  userId: null,
  sessionId: null,
  userEmail: null,
  userData: null,
  googleSession: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserData(state, action) {
      state.userId = action.payload?.userId;
      state.sessionId = action.payload?.sessionId;
      state.userEmail = action.payload?.userEmail;
      state.googleSession = action.payload?.googleSession;
      state.userData = action.payload;
    },
    setUserId(state, action) {
      state.userId = action?.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userId = null;
        state.userData = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // console.log(action.payload.$id);
        state.userId = action.payload.$id;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userId = null;
        state.userData = null;
        state.error = action.error.message;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

export const userIdSelector = (state) => state.auth.userId;
export const userDataSelector = (state) => state.auth.userData;

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      const response = await api.provider().account.get();
      // console.log(response);
      return response;
    } finally {
      // setTimeout(() => dispatch(loadingActions.setLoading(false)), 5000);
      dispatch(loadingActions.setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ sessionId, userId } = {}, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      console.log("logging out...");
      await api.logout({ sessionId, userId });
      dispatch(authActions.setUserData(initialState));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
    return initialState;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password } = {}, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      console.log("logging in...");
      const response = await api.login({ email, password });
      const { userId, $id: sessionId, providerUid: userEmail } = response;
      dispatch(authActions.setUserData({ userId, sessionId, userEmail }));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password } = {}, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      console.log("signing up...");
      await api.register({ email, password, name });
      const sessionResponse = await api.login({ email, password });
      const {
        userId,
        $id: sessionId,
        providerUid: userEmail,
      } = sessionResponse;
      dispatch(authActions.setUserData({ userId, sessionId, userEmail }));

      await api.createDocument(Server.todosDB, Server.usersCollection, userId, {
        email: userEmail,
      });
      return sessionResponse;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
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
