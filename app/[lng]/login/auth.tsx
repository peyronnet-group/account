"use client";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useTheme } from "next-themes";
import { Title } from "@/components/text";
import { useTranslation } from "@/app/i18n/client";
import Logo from "@/components/logo";
import { useSupabase } from "@/app/supabase-provider";

export default function LoginPage(props: { lng: string }) {
  const { supabase } = useSupabase();
  const { theme, systemTheme } = useTheme();
  const { t } = useTranslation(props.lng, "common");
  const customTheme = {
    default: {
      colors: {
        brand: "#2563EB",
        brandAccent: "#1D4ED8",
        brandButtonText: "white",
        defaultButtonBackground: "transparent",
        defaultButtonBackgroundHover: "rgb(226 232 240)",
        defaultButtonBorder: "rgb(203 213 225)",
        defaultButtonText: "black",
        inputBorder: "rgb(203 213 225)",
        inputBorderFocus: "rgb(183 183 195)",
        inputBorderHover: "rgb(193 193 205)",
        inputText: "black",
        inputLabelText: "black",
        dividerBackground: "rgb(203 213 225)",
        anchorTextColor: "rgb(100 116 139)",
      },
    },
    dark: {
      colors: {
        brandButtonText: "white",
        defaultButtonBackground: "rgb(15 23 42)",
        defaultButtonBackgroundHover: "rgb(30 41 59)",
        defaultButtonBorder: "rgb(51 65 85)",
        defaultButtonText: "white",
        inputBorder: "rgb(51 65 85)",
        inputBorderFocus: "rgb(81 95 115)",
        inputBorderHover: "rgb(71 85 105)",
        inputBackground: "rgb(15 23 42)",
        inputText: "white",
        inputLabelText: "white",
        dividerBackground: "rgb(51 65 85)",
        anchorTextColor: "rgb(71 85 105)",
        //..
      },
    },
    // You can also add more theme variations with different names.
    evenDarker: {
      colors: {
        brandButtonText: "white",
        defaultButtonBackground: "rgb(15 23 42)",
        defaultButtonBackgroundHover: "rgb(30 41 59)",
        defaultButtonBorder: "rgb(51 65 85)",
        defaultButtonText: "white",
        inputBorder: "rgb(51 65 85)",
        inputBorderFocus: "rgb(81 95 115)",
        inputBorderHover: "rgb(71 85 105)",
        inputBackground: "rgb(15 23 42)",
        inputText: "white",
        inputLabelText: "white",
        dividerBackground: "rgb(51 65 85)",
        anchorTextColor: "rgb(71 85 105)",
        //..
      },
    },
  };
  return (
    <main className="min-h-[calc(100vh-4rem-1px)] grid sm:grid-cols-2">
      <section className="hidden bg-blue-600 sm:grid p-2 grid-rows-3 justify-center">
        <span></span>
        <span>
          <Title className="text-white">{t("welcome-back")}</Title>
          <p className="ml-2 text-sm font-serif sm:text-lg">
            {t("account-desc")}
          </p>
        </span>
        <div className="bg-slate-800/10 border flex flex-col self-end bottom-0 border-blue-500 p-4 rounded-md">
          <p>{t("account-tip")}</p>
        </div>
      </section>
      <section className="flex-col flex justify-center items-center p-2">
        <div className="bg-white/50 max-w-[600px] w-full backdrop-blur-sm dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-md p-2">
          <span className="flex justify-center">
            <Logo width={250} />
          </span>

          <Auth
            theme={
              theme === "dark"
                ? "dark"
                : theme === "system"
                ? systemTheme
                : "light"
            }
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: customTheme,
            }}
            providers={["github", "google"]}
            socialLayout="vertical"
            redirectTo="https://account.peyronnet.group/auth/callback"
          />
        </div>
      </section>
    </main>
  );
}
