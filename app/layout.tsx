

import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./components/Preloader";
import ScrollBackButton from "./components/ScrollBackButton";

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
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={sora.className}>
        {/* Preloader */}<Preloader />


        {/* Scroll to top */}

        {/* Main app content */}
        {children}
        <ScrollBackButton />
      </body>
    </html>
  );
}
