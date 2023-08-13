import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload?.user;
    },
  },
});

export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;
