"use client";
import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";
import { RxSun, RxMoon } from "react-icons/rx";
const ToggleTheme = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, setTheme } = themeContext!;
  const handleThemeChange = () => {
    setTheme(theme !== "dark" ? "dark" : "light");
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

const article: Article = {
  title: "8 Advanced JavaScript Features to Know",
  content:
    "JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript...",
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: 34,
  image:
    "https://www.squash.io/wp-content/uploads/2023/11/javascript-series.jpg",
};

type Article = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  image: string;
};
