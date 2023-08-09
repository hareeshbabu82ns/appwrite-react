/// AppWrite Session
export const loadAppWriteCookieLocal = () => {
  const key = localStorage.getItem("cookieFallback");
  if (key) {
    const fallback = JSON.parse(localStorage.getItem("cookieFallback"));
    const cookieKey = Object.keys(fallback).find((key) =>
      key.startsWith("a_session_")
    );
    if (cookieKey) return `${cookieKey}=${fallback[cookieKey]}`;
  }
  return "";
};

/// Theme
const initThemeState = {
  mode: "dark",
};

export const saveThemeLocal = (themeData) =>
  localStorage.setItem("theme", JSON.stringify(themeData));

export const loadThemeLocal = () => {
  const theme = localStorage.getItem("theme");
  if (theme) return JSON.parse(localStorage.getItem("theme"));
  else {
    localStorage.setItem("theme", JSON.stringify(initThemeState));
    return initThemeState;
  }
};

export const clearThemeLocal = () =>
  localStorage.setItem("theme", JSON.stringify(initThemeState));
