import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SEO Blogger | PITON Technology",
  description: "Yapay zeka destekli SEO blog içerik üretim ve yönetim platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-zinc-950 text-zinc-50`}>
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
