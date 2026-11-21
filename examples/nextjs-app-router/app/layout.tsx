import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abeta Ecosystem — Next.js App Router Starter",
  description: "Next.js App Router starter with Tailwind CSS v4, @abeta.dev/ui, and @abeta.dev/india.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
