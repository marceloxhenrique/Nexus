import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Private blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en">
      <body className={`bg-background antialiase`}>
        <ThemeProvider>
              {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
