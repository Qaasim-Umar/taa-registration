import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NATCON 2026 - Registration",
  description: "7th Annual National Conference - Knowledge with Purpose: Raising Responsible Muslim Leaders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
