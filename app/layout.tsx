import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <div className="absolute bottom-0 text-center p-2">
          Powered by <Link className="underline" href="https://twitter.com/mrmagan_">@mrmagan_</Link>
        </div>
      </body>
    </html>
  );
}
