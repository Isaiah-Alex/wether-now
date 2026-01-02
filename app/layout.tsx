import type { Metadata } from "next";
import { dmSans, bricolageGrotesque } from "@/app/ui/font";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "weather app",
  description: "weather app created by Isaiah Alex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-neutral-900 text-[18px] text-white ${dmSans.className} box-border px-2 sm:px-4 max-w-6xl lg:mx-auto`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
