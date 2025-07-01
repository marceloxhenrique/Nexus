import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { Providers } from "@/utils/providers";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

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
      <body className="analaised">
        <Providers>
          <section className="flex min-h-screen flex-col bg-custom-background-home">
            <Navbar></Navbar>
            <span className="h-16 bg-custom-background"></span>
            {children}
            <Toaster position="top-center" richColors={true} />
            <Footer></Footer>
          </section>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
