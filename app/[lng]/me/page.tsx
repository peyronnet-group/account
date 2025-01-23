import { useTranslation } from "@/app/i18n";
import CustomerPortalForm from "@/components/ui/AccountForms/CustomerPortalForm";
import EmailForm from "@/components/ui/AccountForms/EmailForm";
import NameForm from "@/components/ui/AccountForms/NameForm";
import SignOutForm from "@/components/ui/AccountForms/SignOutForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DefaultLanguageParams } from "@/lib/languages";
import {
  getSubscriptions,
  getUser,
  getUserDetails,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Account({
  params,
}: {
  params: DefaultLanguageParams;
}) {
  const { lng } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "common");
  const supabase = await createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscriptions(supabase),
  ]);

  if (!user) {
    return redirect("/signin");
  }

  return (
    <section className="">
      <div className="bg-linear-to-br from-blue-500 to-blue-600 p-5 text-white">
        <h2 className="font-wide text-2xl uppercase">{t("my-account")}</h2>
        <p className="ml-1 font-serif">
          {t("welcome-msg").replace(
            "{{user}}",
            userDetails?.full_name || "user",
          )}
        </p>
      </div>

      <div className="m-auto mt-4 grid w-full max-w-3xl gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("peyronnet-apps")}</CardTitle>
            <CardDescription>{t("peyronnet-apps-desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <Link href="https://write.peyronnet.group/me">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 px-2"
                >
                  <Image
                    alt="Synapsy Logo"
                    width={24}
                    height={24}
                    src="/synapsy.png"
                  />
                  <span>Synapsy Write</span>
                  <ExternalLink height={12} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <CustomerPortalForm lng={lng} subscriptions={subscription} />
        <NameForm lng={lng} userName={userDetails?.full_name ?? ""} />
        <EmailForm lng={lng} userEmail={user.email} />
        <SignOutForm lng={lng} />
      </div>
    </section>
  );
}
