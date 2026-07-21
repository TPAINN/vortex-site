import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vortex.app"),
  title: "Vortex — Paste a link. Keep the video.",
  description:
    "Vortex is a free Android app that saves video and audio from YouTube, TikTok, Instagram, X, Reddit, SoundCloud, Spotify and Threads straight to your Downloads folder. No ads, no accounts, no watermarks.",
  keywords: [
    "Vortex",
    "video downloader",
    "Android",
    "YouTube downloader",
    "MP3",
    "MP4",
    "TikTok saver",
    "Instagram downloader",
  ],
  authors: [{ name: "Vortex" }],
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237C3AED'/%3E%3Cstop offset='1' stop-color='%233B82F6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='url(%23g)' stroke-width='10'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='url(%23g)' stroke-width='10' stroke-dasharray='85 45'/%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Vortex — Paste a link. Keep the video.",
    description:
      "Free Android downloader for 10+ platforms. MP4 up to 1080p, MP3 at 320 kbps. No ads, no accounts, no watermarks.",
    url: "https://vortex.app",
    siteName: "Vortex",
    type: "website",
    images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "Vortex — Paste a link. Keep the video." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex — Paste a link. Keep the video.",
    description:
      "Free Android downloader for 10+ platforms. MP4 up to 1080p, MP3 at 320 kbps.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${jetbrains.variable} font-display antialiased`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </body>
    </html>
  );
}
