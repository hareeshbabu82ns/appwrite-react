import React, { Suspense, useMemo } from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import {
  designTokensLight,
  designTokensDark,
  themedComponentsLight,
  themedComponentsDark,
} from "./utils/theme.jsx";
import { useSelector } from "react-redux";
import store from './state/store';

import 'react-toastify/dist/ReactToastify.css';

const generateTheme = ( mode ) => {
  const designTokens = mode === "light" ? designTokensLight : designTokensDark;
  const themedComponents =
    mode === "light" ? themedComponentsLight : themedComponentsDark;

  let theme = createTheme( designTokens );
  theme = deepmerge( theme, themedComponents );

  return theme;
};

export function ThemedApp() {
  const themeMode = useSelector( ( state ) => state.theme.mode );

  const theme = useMemo( () => generateTheme( themeMode ), [ themeMode ] );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
      <ToastContainer />
    </ThemeProvider>
  );
}

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <Suspense>
      <ReduxProvider store={store}>
        <ThemedApp />
      </ReduxProvider>
    </Suspense>
  </React.StrictMode>,
)
