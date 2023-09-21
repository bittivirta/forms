import "./globals.css";
import "./bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biv Forms",
  description:
    "Easy to use forms for your website. Collect user responses easier than ever!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Navigation />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
