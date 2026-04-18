import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@repo/query";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Speaktra - Master English Through Daily Challenges",
  description:
    "Personalized daily English learning challenges tailored to your domain and level. Remember words, learn sentences, master articles, and practice conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, interHeading.variable)}
    >
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
