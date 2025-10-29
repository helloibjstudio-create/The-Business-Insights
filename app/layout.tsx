import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Hedvig_Letters_Serif } from "next/font/google"
import "./globals.css";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Business Insights",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={hedvig.className}
      >
        {children}
      </body>
    </html>
  );
}
