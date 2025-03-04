import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "DjangoBnb",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
          <Navbar />
        <div className="pt-24">
        {children}
        </div>
      </body>
    </html>
  );
}
