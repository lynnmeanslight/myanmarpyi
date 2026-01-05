import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "./wagmiProvider";
import { headers } from "next/headers";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { ErudaProvider } from "./components/ErudaProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Myanmar Pyi - Spread Positive Energy Across Myanmar",
  description:
    "Share and read uplifting messages from peers across Myanmar's 15 regions. A bilingual platform spreading positive energy and community support through blockchain on Base.",
  keywords: [
    "Myanmar",
    "positive messages",
    "community support",
    "Burma",
    "blockchain",
    "Base",
    "peer messages",
    "Burmese",
    "positive energy",
    "မြန်မာ",
    "regional connection",
    "uplifting platform",
  ],
  authors: [{ name: "Myanmar Pyi Team" }],
  creator: "Myanmar Pyi",
  publisher: "Myanmar Pyi",
  metadataBase: new URL("https://myanmarpyi.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Myanmar Pyi - Spread Positive Energy Across Myanmar",
    description:
      "Share and read uplifting messages from peers across Myanmar's 15 regions. Spreading positive energy through community support.",
    url: "https://myanmarpyi.vercel.app/",
    siteName: "Myanmar Pyi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Myanmar Pyi - Community Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myanmar Pyi - Spread Positive Energy",
    description:
      "Share and read uplifting messages from peers across Myanmar's 15 regions",
    images: ["/og-image.png"],
    creator: "@myanmarpyi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification tokens when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: "technology",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Myanmar Pyi" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErudaProvider />
        <Providers initialState={initialState}>
          {props.children} <Analytics />
        </Providers>
      </body>
    </html>
  );
}
