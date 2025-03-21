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
    <html lang="en">
      <body className="analiased">
        <ThemeProvider>
          <section className="flex min-h-screen flex-col bg-custom-background-home">
            <ClerkProvider>
              <Navbar></Navbar>
              {children}
              <Footer></Footer>
            </ClerkProvider>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
