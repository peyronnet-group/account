import Link from "next/link";

import Logo from "./logo";
import { useTranslation } from "@/app/i18n";

export default async function SiteFooter(props: { lng: string }) {
  const { t } = await useTranslation(props.lng, "common");
  return (
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
            href={"https://peyronnet.group/cgu"}
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
  );
}
