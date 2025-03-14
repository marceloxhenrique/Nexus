"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeType = {
  theme: string;
  setTheme: (e: string) => void;
};

export const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
