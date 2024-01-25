"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";

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
    <div className="p-2">
      <h2 className="text-2xl uppercase font-wide">{t("my-account")}</h2>
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
        <section className="flex space-x-2 justify-center m-2">
          <div>
            <form action="/auth/signout" method="post">
              <Button
                variant="destructive"
                className="button block"
                type="submit"
              >
                {t("sign-out")}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
