import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { fontSans, fontSerif, fontWide } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Account | Peyronnet Group",
  description: "Manage your Peyronnet account.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: any };
}) {
  return (
    <html lang={lng}>
      <body
        className={cn(
          "font-sans antialiased dark:bg-[#000014] min-h-screen",
          fontSans.variable,
          fontWide.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen">
            <SiteHeader lng={lng} />
            <div>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
