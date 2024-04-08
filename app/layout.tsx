import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/app/components";

export const metadata: Metadata = {
  title: "One-Stop Car E-Commerce",
  description: "Awesome Cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
