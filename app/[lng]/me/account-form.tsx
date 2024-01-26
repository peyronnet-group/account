"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { Paragraph } from "@/components/text";
import { ShoppingBag } from "lucide-react";

export default function AccountForm({ user, lng }: any) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        setFullname(user?.full_name || user.user_metadata.full_name);
        setUsername(user?.user_name || user.user_metadata.user_name);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const { t } = useTranslation(lng, "common");
  return (
    <section className="">
      <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <h2 className="text-2xl uppercase font-wide">{t("my-account")}</h2>
        <p className="font-serif ml-1">
          {t("welcome-msg").replace("{{user}}", fullname || "user")}
        </p>
      </div>
      <div className="p-2">
        <h3 className="font-wide uppercase">{t("your-info")}</h3>
        <p className="font-serif">{t("your-info-desc")}</p>
      </div>
      <div className="form-widget border border-slate-200 dark:border-slate-800 m-2 p-2 rounded-md">
        <div>
          <label htmlFor="email">{t("email")}</label>
          <Input id="email" type="text" value={user?.email} disabled />
        </div>
        <div>
          <label htmlFor="fullName">{t("full-name")}</label>
          <Input
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">{t("username")}</label>
          <Input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-wide uppercase">{t("products")}</h3>
        <p className="font-serif">{t("products-desc")}</p>
      </div>
      <div className="m-2 p-5 border rounded-md flex flex-col items-center space-y-2 border-slate-200 dark:border-slate-800">
        <ShoppingBag />
        <p className="font-serif">{t("no-products")}</p>
      </div>
      <div className="p-2">
        <h3 className="font-wide uppercase">{t("session")}</h3>
        <form action="/auth/signout" method="post">
          <Button
            variant="link"
            className="button block text-red-500 dark:text-red-600"
            type="submit"
          >
            {t("sign-out")}
          </Button>
        </form>
      </div>
    </section>
  );
}
