import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "boxicons/css/boxicons.min.css";
import "./globals.css";

const promptFont = Prompt({
  subsets: ["latin"],
  variable: "--font-prompt",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Storebrand - Premium Products",
  description: "E-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={promptFont.className}>
      <body className="min-h-screen flex flex-col m-0 p-0">
        {children}
      </body>
    </html>
  );
}
