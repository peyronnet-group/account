"use client";
import Image from "next/image";
import { useTranslation } from "../i18n/client";

export default function Home({ params: { lng } }: { params: { lng: any } }) {
  const { t } = useTranslation(lng, "common");
  return (
    <main className="min-h-screen p-2 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">{t("home-headline")}</h1>
      <p className="text-center">{t("home-desc")}</p>
    </main>
  );
}
