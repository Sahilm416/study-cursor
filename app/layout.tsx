import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/components/next-auth/session-provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Study-Cursor",
  description: "Study-Cursor is a AI-powered cursor-like study platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#f5f5f5]`}
      >
        <NextAuthSessionProvider>
          {/* <Navbar /> */}
          {children}
          <Toaster richColors={false} />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
