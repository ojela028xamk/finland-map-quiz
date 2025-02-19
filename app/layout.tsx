import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${suomiFont.className}`}>{children}</body>
    </html>
  );
}
