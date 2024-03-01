"use client";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useTheme } from "next-themes";
import { Title } from "@/components/text";
import { useTranslation } from "@/app/i18n/client";
import Logo from "@/components/logo";
import { useSupabase } from "@/app/supabase-provider";
import { WavyBackground } from "@/components/ui/wavy-background";

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
    <main className="min-h-[calc(100vh-4rem-1px)] flex flex-col justify-center">
      {theme === "dark" ? (
        <WavyBackground backgroundFill="black"></WavyBackground>
      ) : (
        <>
          {theme === "system" && systemTheme === "dark" ? (
            <WavyBackground backgroundFill="black"></WavyBackground>
          ) : (
            <WavyBackground backgroundFill="white"></WavyBackground>
          )}
        </>
      )}
      <section className="p-2 flex flex-col items-center justify-center">
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
            localization={{
              variables: {
                sign_up: {
                  social_provider_text: t("login-social"),
                  email_input_placeholder: t("email-input-placeholder"),
                  password_input_placeholder: t("password-input-placeholder"),
                  button_label: t("sign-up"),
                  link_text: t("link-text"),
                  password_label: t("create-password-label"),
                  email_label: t("email-label"),
                },
                sign_in: {
                  social_provider_text: t("login-social"),
                  email_input_placeholder: t("email-input-placeholder"),
                  password_input_placeholder: t("password-input-placeholder"),
                  button_label: t("sign-in"),
                  link_text: t("sign-in-link-text"),
                  password_label: t("password-input-placeholder"),
                  email_label: t("email-label"),
                },
                forgotten_password: {
                  password_label: t("password-input-placeholder"),
                  email_label: t("email-label"),
                  email_input_placeholder: t("email-input-placeholder"),
                  loading_button_label: t("password-loading-button-label"),
                  link_text: t("password-link-text"),
                  confirmation_text: t("password-confirmation-text"),
                  button_label: t("password-button-label"),
                },
              },
            }}
          />
        </div>
      </section>
    </main>
  );
}
