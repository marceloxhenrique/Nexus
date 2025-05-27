"use client";
import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";
import { RxSun, RxMoon } from "react-icons/rx";
const ToggleTheme = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, setTheme } = themeContext!;
  const handleThemeChange = () => {
    setTheme(theme !== "dark" ? "dark" : "light");
    localStorage.setItem("NexusTheme", theme !== "dark" ? "dark" : "light");
  };
  return (
    <div
      onClick={handleThemeChange}
      className="cursor-pointer rounded-full p-2 hover:bg-neutral-200 hover:dark:bg-neutral-800"
    >
      {theme !== "dark" ? (
        <RxMoon className="size-5 rounded-full text-primary"></RxMoon>
      ) : (
        <RxSun className="size-5 rounded-full text-primary"></RxSun>
      )}
    </div>
  );
};

export default ToggleTheme;
