"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";

import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Logo from "./logo";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useTranslation } from "@/app/i18n/client";

interface MainNavProps {
  items?: NavItem[];
  lng: string;
}
export function SheetMenu(props: { lng: string }) {
  const { t } = useTranslation(props.lng, "common");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden" variant={"ghost"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full">
        <SheetHeader className="flex items-center">
          <SheetTitle>
            <Logo height={64} width={256} />
          </SheetTitle>
        </SheetHeader>

        <Link
          href={"/"}
          className={cn(
            "flex items-center px-2 text-lg font-semibold text-slate-200-foreground"
          )}
        >
          {t("home")}
        </Link>
        <Link
          href={"https://leocorporation.dev"}
          className={cn(
            "flex items-center px-2 text-lg font-semibold text-slate-200-foreground"
          )}
        >
          Léo Corporation
        </Link>
        <Link
          href={"https://dev.peyronnet.group"}
          className={cn(
            "flex items-center px-2 text-lg font-semibold text-slate-200-foreground"
          )}
        >
          Devyus
        </Link>
      </SheetContent>
    </Sheet>
  );
}
export function NavMenu(props: { lng: string }) {
  const { t } = useTranslation(props.lng, "common");
  return (
    <>
      <SheetMenu lng={props.lng} />

      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={"bg-transparent " + navigationMenuTriggerStyle()}
              >
                {t("home")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Léo Corporation
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 from-slate-200/50 to-slate-200 p-6 no-underline outline-none focus:shadow-md"
                      href="https://leocorporation.dev"
                    >
                      <img
                        height={128}
                        width={128}
                        src={"Logo.svg"}
                        alt={"The logo of Léo Corporation."}
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Léo Corporation
                      </div>
                      <p className="text-sm leading-tight text-slate-200-foreground">
                        Experience creator.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="https://leocorporation.dev/store/passliss"
                  title="Passliss"
                >
                  {t("passliss-desc")}
                </ListItem>
                <ListItem
                  href="https://gavilya.leocorporation.dev"
                  title="Gavilya"
                >
                  {t("gavilya-desc")}
                </ListItem>
                <ListItem href="https://leocorporation.dev/store" title="Store">
                  {t("browse-apps")}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Devyus
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-200/50 to-slate-200 p-6 no-underline outline-none focus:shadow-md"
                      href="https://dev.peyronnet.group"
                    >
                      <img
                        height={128}
                        width={128}
                        src={"Devyus.png"}
                        alt={"The logo of Devyus."}
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Devyus
                      </div>
                      <p className="text-sm leading-tight text-slate-200-foreground">
                        {t("devyus-tagline")}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="https://peyrsharp.leocorporation.dev/"
                  title="PeyrSharp"
                >
                  {t("peyrsharp-desc")}
                </ListItem>
                <ListItem
                  href="https://synethia.leocorporation.dev/"
                  title="Synethia"
                >
                  {t("synethia-desc")}
                </ListItem>
                <ListItem
                  href="https://www.nuget.org/profiles/Devyus"
                  title="NuGet"
                >
                  {t("see-all-nuget")}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-200-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNav({ items, lng }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Logo height={48} width={180} />
      </Link>
      <NavMenu lng={lng} />
    </div>
  );
}
