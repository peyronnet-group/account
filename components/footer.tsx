"use client";

import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

import Logo from "./logo";

export default function SiteFooter({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "common");
  return (
    <footer className="flex flex-col justify-center space-y-2 border-t dark:border-slate-800 px-5 py-10 sm:grid sm:grid-cols-2 print:hidden">
      <div className="flex items-center justify-center sm:justify-normal">
        <Link href="https://peyronnet.group">
          <Logo width={256} height={64} />
        </Link>
      </div>
      <div className="m-4 flex flex-wrap justify-center sm:m-0 sm:justify-normal">
        <FooterLink
          title="Blog"
          description={t("blog-desc")}
          link="https://blog.peyronnet.group"
        />
        <FooterLink
          title={t("privacy-policy")}
          description={t("privacy-desc")}
          link="https://peyronnet.group/privacy"
        />

        <FooterLink
          title={t("terms-sell")}
          description={t("cgv-desc")}
          link="https://peyronnet.group/cgv"
        />

        <FooterLink
          title="X"
          description={t("x-desc")}
          link="https://twitter.com/PeyronnetGroup"
        />

        <FooterLink
          title="YouTube"
          description={t("youtube-desc")}
          link="https://www.youtube.com/@PeyronnetGroup"
        />
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  title: string;
  description: string;
  link: string;
}

function FooterLink(props: FooterLinkProps) {
  return (
    <Link
      href={props.link}
      className="block w-64 rounded-md border border-transparent p-4 transition-all hover:border-slate-500/50 hover:bg-slate-100 dark:hover:bg-slate-900"
    >
      <h3 className="text-lg font-bold leading-tight tracking-tighter">
        {props.title}
      </h3>
      <p className="text-slate-700 dark:text-slate-300">{props.description}</p>
    </Link>
  );
}
