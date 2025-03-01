import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./common/header";

const suomiFont = localFont({ src: "./Finlandica-Regular.woff2" });

export const metadata: Metadata = {
  title: "Finnish map quiz",
  description: "Finnish map quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suomiFont.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
