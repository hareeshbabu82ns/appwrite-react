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
