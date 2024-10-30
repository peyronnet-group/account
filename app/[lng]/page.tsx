"use client";

import SiteFooter from "@/components/footer";
import { Paragraph, Title } from "@/components/text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { DefaultLanguageParams } from "@/lib/languages";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import { useTranslation } from "../i18n/client";

export default function Home({ params }: { params: DefaultLanguageParams }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");

  return (
    <>
      <main className="flex min-h-screen flex-col justify-center">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col items-center justify-center gap-4 px-4 dark:text-white"
          >
            <Title className="text-center">{t("home-headline")}</Title>
            <Paragraph className="text-center">{t("home-desc")}</Paragraph>
            <span className="m-2 flex justify-center">
              <Link href="/signin">
                <Button>{t("sign-in")}</Button>
              </Link>
            </span>

            <div className="flex flex-col justify-center sm:flex-row">
              <div className="m-2 flex items-center space-x-2 rounded-md border border-slate-200 bg-white/40 p-2 font-bold backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/40">
                <Image
                  src="/synapsy.png"
                  width={30}
                  height={30}
                  alt="Synapsy logo"
                />
                <p>Synapsy AI</p>
              </div>
              <div className="m-2 flex items-center space-x-2 rounded-md border border-slate-200 bg-white/40 p-2 font-bold backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/40">
                <Image
                  src="/Logo.svg"
                  width={30}
                  height={30}
                  alt="Léo Corporation logo"
                />
                <p>Léo Corporation</p>
              </div>
              <div className="m-2 flex items-center space-x-2 rounded-md border border-slate-200 bg-white/40 p-2 font-bold backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/40">
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
