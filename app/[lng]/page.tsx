"use client";
import { useTranslation } from "../i18n/client";
import { Paragraph, Title } from "@/components/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function Home({ params: { lng } }: { params: { lng: any } }) {
  const { t } = useTranslation(lng, "common");

  return (
    <>
      <main className="min-h-screen flex flex-col justify-center">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4 dark:text-white"
          >
            <Title className="text-center">{t("home-headline")}</Title>
            <Paragraph className="text-center">{t("home-desc")}</Paragraph>
            <span className="flex justify-center m-2">
              <Link href="/login">
                <Button variant="outline">{t("sign-in")}</Button>
              </Link>
            </span>
          </motion.div>
        </AuroraBackground>
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
