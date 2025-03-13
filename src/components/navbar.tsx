"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useState } from "react";

export default function Navbar() {
  const themeContext = useContext(ThemeContext)
  const { theme, setTheme} = themeContext!;
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  };
  return (
    <>
      <nav className="mx-auto max-w-[90rem] flex h-16 justify-between items-center px-4 md:px-8">
        <p className="text-4xl text-primary font-secondary font-bold">My Blog</p>
        <button
          onClick={handleTheme}
          className="w-16 rounded-md bg-primary px-4 py-2 text-secondary"
        >
          {theme === "light" ? "dark" : "light"}
        </button>
      </nav>
      <div className=" border-b-[0.01rem] border-primary w-full"></div>
    </>
  );
}
