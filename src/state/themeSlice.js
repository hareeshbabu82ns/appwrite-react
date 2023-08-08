import { createSlice } from "@reduxjs/toolkit";
import { loadThemeLocal, saveThemeLocal } from "../utils/utils";

const { mode } = loadThemeLocal();

const initialState = {
  mode,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      saveThemeLocal({ ...state, mode: state.mode });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
