import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@repo/query";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Speaktra | Professional English Speaking Practice",
  description:
    "Master professional English through daily domain-specific speaking practice. Build confidence for meetings, presentations, and collaborations.",
  icons: {
    icon: "/logo-icon.png",
  },
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
