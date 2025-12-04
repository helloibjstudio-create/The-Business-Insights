import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { Hedvig_Letters_Serif } from "next/font/google"
import "./globals.css";
import ScrollToTop from "./ScrollToTop";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
        className={sora.className}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
