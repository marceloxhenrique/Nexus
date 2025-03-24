import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nexus – A Blog for Developers & Creators",
  description:
    "Nexus is a blog where developers and creators share insights, tutorials, and experiences in technology. Join our community to explore and learn.",
  keywords: [
    "blog",
    "developers",
    "technology",
    "tutorials",
    "creators",
    "articles",
    "news",
  ],
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
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
