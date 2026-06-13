import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora Farm",
  description: "Fresh natural farm products from Velora Farm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
