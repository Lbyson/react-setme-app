export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark-theme" || savedTheme === "bright-theme")
    return savedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = prefersDark ? "dark-theme" : "bright-theme";

  localStorage.setItem("theme", defaultTheme);

  return defaultTheme;
};
export const setTheme = (theme) => {
  document.body.classList.remove("dark-theme", "bright-theme");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
};
