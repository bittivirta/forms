import "./scss/global.scss";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "/dist/output.css";
config.autoAddCss = false;

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title:
    "Next.js + TypeScript + Tailwind + Flowbite + SCSS = Bittivirta 23 Boilerplate",
  description: "Make a wish, and we will play it for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
