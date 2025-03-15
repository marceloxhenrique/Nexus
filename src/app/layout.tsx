import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Private blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiase mx-auto flex min-h-screen max-w-[80rem] flex-col justify-center bg-background px-4 md:px-8`}
      >
        <ThemeProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
