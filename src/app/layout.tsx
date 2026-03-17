import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stack Explorer — What Tech Stack Does That Website Use?",
  description:
    "Free tech stack checker — paste any URL to instantly detect the framework, hosting, analytics, payments, CSS, and CMS. Identifies 50+ technologies including React, Next.js, Vercel, Stripe, Tailwind, WordPress, and more.",
  keywords: [
    "tech stack checker",
    "what tech does this website use",
    "website technology detector",
    "built with",
    "wappalyzer alternative",
    "stack detector",
    "website scanner",
  ],
  openGraph: {
    title: "Stack Explorer — What Tech Stack Does That Website Use?",
    description:
      "Free tool to detect the tech stack of any website. Paste a URL and instantly see the framework, hosting, analytics, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
