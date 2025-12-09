import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { Hedvig_Letters_Serif } from "next/font/google"
import "./globals.css";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./components/Preloader";

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
        <Preloader />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
