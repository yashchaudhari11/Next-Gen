import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Luminary — Next-Gen Student Dashboard",
  description: "Futuristic learning platform mission control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen text-[#F0F2FF] bg-[#080810] overflow-x-hidden relative">
        {/* Deep space void background nebulae */}
        <div className="cosmos-bg" />
        {/* Atmospheric paper grain texture */}
        <div className="cosmos-noise" />

        {/* Trailing glassmorphism cursor */}
        <CustomCursor />

        {/* Client Layout Shell */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
