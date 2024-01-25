import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontSerif, fontWide } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

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
          "font-sans antialiased dark:bg-[#000014]",
          fontSans.variable,
          fontWide.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader lng={lng} />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
