import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Gilroy-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Gilroy-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const SITE_URL = "https://immersive-cinematic-ui.netlify.app";
const TITLE = "Immersive Cinematic UI";
const DESCRIPTION =
  "A scroll-driven cinematic experience — WebGL, GSAP ScrollTrigger and Lenis, tuned to run smoothly on phones as well as desktops.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} — Scroll-Driven Experience`,
    template: `%s — ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  authors: [{ name: "Danylo Hrytsenko" }],
  creator: "Danylo Hrytsenko",
  keywords: [
    "creative development",
    "scroll driven animation",
    "WebGL",
    "three.js",
    "GSAP ScrollTrigger",
    "Next.js",
    "cinematic web design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: TITLE,
    title: `${TITLE} — Scroll-Driven Experience`,
    description: DESCRIPTION,
    images: [
      {
        url: "/media/image/backdrop-poster.webp",
        width: 1280,
        height: 720,
        alt: "Cinematic forest backdrop from the Immersive Cinematic UI experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Scroll-Driven Experience`,
    description: DESCRIPTION,
    images: ["/media/image/backdrop-poster.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gilroy.variable}>
      <head>
        <link rel="preload" as="image" href="/media/image/backdrop-poster.webp" />
      </head>

      <body className="antialiased">
        <a href="#hero" className="skip-link">
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
