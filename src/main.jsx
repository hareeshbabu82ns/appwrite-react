import React, { Suspense, useMemo } from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from 'react-redux';

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

const generateTheme = ( mode ) => {
  const designTokens = mode === "light" ? designTokensLight : designTokensDark;
  const themedComponents =
    mode === "light" ? themedComponentsLight : themedComponentsDark;

  let theme = createTheme( designTokens );
  theme = deepmerge( theme, themedComponents );

  return theme;
};

function ThemedApp() {
  const themeState = useSelector( ( state ) => state.theme );

  const theme = useMemo( () => generateTheme( themeState.mode ), [ themeState.mode ] );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
