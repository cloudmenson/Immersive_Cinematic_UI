import type { Metadata } from "next";

import { Preloader } from "@/shared";

import "./globals.css";

export const metadata: Metadata = {
  title: "Zero limits - Cinematic UI",
  description: "Scroll drive experiences with cinematic UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Preloader>{children}</Preloader>
      </body>
    </html>
  );
}
