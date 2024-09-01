"use client";
import { useTranslation } from "../i18n/client";
import { Paragraph, Title } from "@/components/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Image from "next/image";
import SiteFooter from "@/components/footer";

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
              <Link href="/signin">
                <Button>{t("sign-in")}</Button>
              </Link>
            </span>

            <div className="flex sm:flex-row flex-col justify-center">
              <div className="font-bold flex items-center space-x-2 p-2 m-2 border rounded-md backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700">
                <Image
                  src="/synapsy.png"
                  width={30}
                  height={30}
                  alt="Synapsy logo"
                />
                <p>Synapsy AI</p>
              </div>
              <div className="font-bold flex items-center space-x-2 p-2 m-2 border rounded-md backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700">
                <Image
                  src="/Logo.svg"
                  width={30}
                  height={30}
                  alt="Léo Corporation logo"
                />
                <p>Léo Corporation</p>
              </div>
              <div className="font-bold flex items-center space-x-2 p-2 m-2 border rounded-md backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700">
                <Image
                  src="/Devyus.png"
                  width={30}
                  height={30}
                  alt="Devyus logo"
                />
                <p>Devyus</p>
              </div>
            </div>
          </motion.div>
        </AuroraBackground>
      </main>
      <SiteFooter lng={lng} />
    </>
  );
}
