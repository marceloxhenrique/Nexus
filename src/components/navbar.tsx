"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useState } from "react";

export default function Navbar() {
  const themeContext = useContext(ThemeContext);
  const { theme, setTheme } = themeContext!;
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 md:px-8">
        <p className="font-secondary text-4xl font-bold text-text-main">
          My Blog
        </p>
        <button
          onClick={handleTheme}
          className="w-16 cursor-pointer rounded-md bg-primary px-4 py-2 text-secondary"
        >
          {theme === "light" ? "dark" : "light"}
        </button>
      </nav>
      <div className="w-full border-b-[0.01rem] border-primary"></div>
    </>
  );
}
