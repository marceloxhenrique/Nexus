import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className="analiased bg-custom-background">
          <ThemeProvider>
            <section className="mx-auto flex h-full min-h-screen max-w-[80rem] flex-col px-3">
              <Navbar></Navbar>
              {children}
              <Footer></Footer>
            </section>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
// mx-auto flex min-h-screen max-w-[80rem] flex-col justify-center bg-custom-background px-4 antialiased md:px-8
