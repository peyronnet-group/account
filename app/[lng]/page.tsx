"use client";
import Image from "next/image";
import { useTranslation } from "../i18n/client";
import { Paragraph, Title } from "@/components/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home({ params: { lng } }: { params: { lng: any } }) {
  const { t } = useTranslation(lng, "common");

  return (
    <main className="min-h-screen p-2 flex flex-col justify-center">
      <Title className="text-center">{t("home-headline")}</Title>
      <Paragraph className="text-center">{t("home-desc")}</Paragraph>
      <span className="flex justify-center m-2">
        <Link href="/login">
          <Button variant="outline">{t("sign-in")}</Button>
        </Link>
      </span>
    </main>
  );
}
