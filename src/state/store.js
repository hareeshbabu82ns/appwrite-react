import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer from "./globalSlice";
import themeReducer from "./themeSlice";
import todosReducer from "./todosSlice";
import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    global: globalReducer,
    theme: themeReducer,
    todos: todosReducer,
    auth: authReducer,
    loading: loadingReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;
