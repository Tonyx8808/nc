import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/curved-menu";

export const metadata: Metadata = {
  title: "NC Consulting",
  description: "NC Consulting - Soluzioni innovative",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}