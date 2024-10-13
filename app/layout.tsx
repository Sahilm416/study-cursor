import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/components/next-auth/session-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#181818] text-white`}
      >
        <NextAuthSessionProvider>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
          {/* <Navbar /> */}
          {children}
          <Toaster richColors={false} />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
