import type { Metadata } from "next";
import "./globals.css";
import AudioProvider from "@/components/AudioProvider";

export const metadata: Metadata = {
  title: "Bubu – Across the Blue 💙",
  description: "A love story across 3 years, 4 months, and 23 days. Happy Birthday, my Bubu.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
