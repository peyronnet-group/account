import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontSerif, fontWide } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Account | Peyronnet Group",
  description: "Manage your Peyronnet account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(fontSans.variable, fontWide.variable, fontSerif.variable)}
      >
        {children}
      </body>
    </html>
  );
}
