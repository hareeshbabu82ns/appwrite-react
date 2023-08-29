import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  header: null,
  subHeader: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload?.user;
    },
    setHeader: (state, { payload }) => {
      state.header = payload?.header;
      state.subHeader = payload?.subHeader;
    },
  },
});

export const { setUser, setHeader } = globalSlice.actions;

export const headerSelector = (state) => state.global.header;
export const subHeaderSelector = (state) => state.global.subHeader;

export default globalSlice.reducer;
