import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutProvider from "@/components/providers/LayoutProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Auth by @sparkverse",
  description: "Authentication example for full-stack applications.",
  keywords: [
    "next.js",
    "auth",
    "authentication",
    "authentication example",
    "next.js authentication",
    "next.js auth",
    "next.js authentication example",
    "next.js auth example",
    "next.js authentication starter",
    "next.js auth starter",
    "next.js authentication template",
    "next.js auth template",
    "next.js authentication boilerplate",
  ],
  authors: [{ name: "vivekcsein", url: "https://vivekcse.in" }],
  creator: "vivekcsein",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
