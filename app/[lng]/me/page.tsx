import { useTranslation } from "@/app/i18n";
import {
  getSession,
  getUserDetails,
  getSubscription,
} from "@/app/supabase-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/types_db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Account() {
  const { t } = await useTranslation("fr", "common");

  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ]);

  const user = session?.user;

  if (!session) {
    return redirect("/login");
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const updateName = async (formData: FormData) => {
    "use server";

    const newName = formData.get("name") as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;
    const { error } = await supabase
      .from("users")
      .update({ full_name: newName })
      .eq("id", user?.id || "");
    if (error) {
      console.log(error);
    }
    revalidatePath("/me");
  };

  const updateEmail = async (formData: FormData) => {
    "use server";

    const newEmail = formData.get("email") as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath("/me");
  };

  return (
    <section className="">
      <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <h2 className="text-2xl uppercase font-wide">{t("my-account")}</h2>
        <p className="font-serif ml-1">
          {t("welcome-msg").replace(
            "{{user}}",
            userDetails?.full_name || "user"
          )}
        </p>
      </div>
      <div className="p-4">
        <Card
          title={t("products")}
          description={
            subscription ? t("products-available") : t("no-products")
          }
        >
          <div className="mt-8 mb-4">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">{t("products-desc")}</Link>
            )}
          </div>
        </Card>
        <Card
          title={t("full-name")}
          description={t("name-desc")}
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">{t("name-char")}</p>
              <Button type="submit" form="nameForm">
                {t("update-name")}
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="nameForm" action={updateName}>
              <Input
                type="text"
                name="name"
                defaultValue={userDetails?.full_name ?? ""}
                placeholder={t("full-name")}
                maxLength={64}
              />
            </form>
          </div>
        </Card>
        <Card
          title={t("email")}
          description={t("email-desc")}
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">{t("email-notify")}</p>
              <Button type="submit" form="emailForm" disabled={true}>
                {t("update-email")}
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="emailForm" action={updateEmail}>
              <Input
                type="text"
                name="email"
                defaultValue={user ? user.email : ""}
                placeholder={t("email")}
                maxLength={64}
              />
            </form>
          </div>
        </Card>
        <Card title={t("session")} description={t("sign-out")}>
          <form action="/auth/signout" method="post">
            <Button
              variant="link"
              className="button block text-red-500 dark:text-red-600"
              type="submit"
            >
              {t("sign-out")}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-md border-slate-200 dark:border-slate-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-xl font-wide uppercase">{title}</h3>
        <p className="text-slate-700 dark:text-slate-300 font-serif">
          {description}
        </p>
        {children}
      </div>
      {footer ? (
        <div className="p-4 border-t rounded-b-md border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 text-slate-500">
          {footer}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
