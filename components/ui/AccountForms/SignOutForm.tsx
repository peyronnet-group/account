"use client";

import { useTranslation } from "@/app/i18n/client";
import { handleRequest } from "@/utils/auth-helpers/client";
import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

export default function SignOutForm({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "common");
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("session")}</CardTitle>
        <CardDescription>{t("sign-out")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) =>
            handleRequest(
              e,
              SignOut,
              getRedirectMethod() === "client" ? router : null,
            )
          }
        >
          <input type="hidden" name="pathName" value={usePathname()} />
          <Button
            variant="link"
            className="button block text-red-500 dark:text-red-600"
            type="submit"
          >
            {t("sign-out")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
