import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Providers from "@/component/Provider";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ better performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Worker App",
    template: "%s | Worker App", // dynamic titles per page
  },
  description: "Find and hire skilled workers easily with Worker App.",
  icons: {
    icon: "/Logo.svg",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        {/* Navbar always visible */}
        <Navbar />

        {/* Global provider ( React Query) */}
        <Providers>
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
