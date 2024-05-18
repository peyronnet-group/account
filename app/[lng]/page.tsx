"use client";
import Image from "next/image";
import { useTranslation } from "../i18n/client";
import { Paragraph, Title } from "@/components/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SiteFooter from "@/components/footer";
import Logo from "@/components/logo";

export default function Home({ params: { lng } }: { params: { lng: any } }) {
  const { t } = useTranslation(lng, "common");

  return (
    <>
      <main className="min-h-screen p-2 flex flex-col justify-center">
        <Title className="text-center">{t("home-headline")}</Title>
        <Paragraph className="text-center">{t("home-desc")}</Paragraph>
        <span className="flex justify-center m-2">
          <Link href="/login">
            <Button variant="outline">{t("sign-in")}</Button>
          </Link>
        </span>
      </main>
      <footer className="flex flex-col justify-center space-y-2 px-5 py-10 sm:grid sm:grid-cols-3">
        <div className="flex items-center justify-center sm:justify-normal">
          <Link href="/">
            <Logo width={256} height={64} />
          </Link>
        </div>
        <div className="m-4 sm:m-0">
          <h3 className="font-wide text-md uppercase leading-tight tracking-tighter">
            {t("links")}
          </h3>
          <div className="flex flex-col">
            <Link
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
              href={"https://blog.peyronnet.group"}
            >
              Blog
            </Link>
            <Link
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
              href={"https://peyronnet.group/privacy"}
            >
              {t("privacy-policy")}
            </Link>
            <Link
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
              href={"https://peyronnet.group/cgv"}
            >
              {t("terms-sell")}
            </Link>
          </div>
        </div>
        <div className="m-4 sm:m-0">
          <h3 className="font-wide text-md uppercase leading-tight tracking-tighter">
            {t("socials")}
          </h3>
          <div className="flex flex-col">
            <Link
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
              href={"https://twitter.com/PeyronnetGroup"}
            >
              Twitter
            </Link>
            <Link
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
              href={"https://www.youtube.com/@PeyronnetGroup"}
            >
              YouTube
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
