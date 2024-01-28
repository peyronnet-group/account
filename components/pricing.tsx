"use client";

import { Database } from "@/types_db";
import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({
  session,
  user,
  products,
  subscription,
}: Props) {
  const { t } = useTranslation("fr", "common");
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/login");
    }
    if (subscription) {
      return router.push("/me");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  console.log(JSON.stringify(products[0].prices));
  if (!products.length)
    return <section>No plans are available right now.</section>;

  if (products.length === 1)
    return (
      <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h2 className="text-2xl uppercase font-wide">
              {t("available-products")}
            </h2>
            <p className="font-serif">{t("available-products-desc")}</p>
            <div className="relative flex self-center mt-12 border rounded-lg bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
              <div className="border border-blue-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-slate-900 divide-slate-600">
                <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-slate-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0,
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="rounded-lg shadow-sm divide-y bg-white divide-slate-100 dark:divide-slate-600 dark:bg-slate-900"
                  >
                    <div className="p-6">
                      <p>
                        <span className="text-5xl font-extrabold white">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-slate-100">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-slate-300">{price.description}</p>
                      <Button
                        type="button"
                        disabled={false}
                        onClick={() => handleCheckout(price)}
                        className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md hover:bg-slate-900 "
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? "Manage"
                          : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <LogoCloud />
        </div>
      </section>
    );

  return (
    <section>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h2 className="text-2xl uppercase font-wide">
            {t("available-products")}
          </h2>
          <p className="font-serif">{t("available-products-desc")}</p>
          <div className="relative self-center mt-6 dark:bg-slate-900 rounded-lg p-0.5 flex sm:mt-8 border dark:border-slate-800">
            {intervals.includes("month") && (
              <button
                onClick={() => setBillingInterval("month")}
                type="button"
                className={`${
                  billingInterval === "month"
                    ? "relative w-1/2 bg-slate-100 border-slate-200 dark:bg-slate-700 dark:border-slate-800 shadow-sm dark:text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-slate-400"
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                {t("monthly-billing")}
              </button>
            )}
            {intervals.includes("year") && (
              <button
                onClick={() => setBillingInterval("year")}
                type="button"
                className={`${
                  billingInterval === "year"
                    ? "relative w-1/2 bg-slate-100 border-slate-200 dark:bg-slate-700 dark:border-slate-800 shadow-sm dark:text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-slate-400"
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                {t("yearly-billing")}
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  "rounded-lg shadow-sm divide-y border border-slate-300 dark:border-slate-700 bg-white divide-slate-100 dark:divide-slate-600 dark:bg-slate-900",
                  {
                    "border border-blue-500": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === "Freelancer",
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 dark:text-slate-300">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-3xl font-bold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium dark:text-slate-100">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    type="button"
                    onClick={() => handleCheckout(price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-slate-900"
                  >
                    {subscription ? t("manage") : t("subscribe")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <LogoCloud />
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase text-slate-400 text-center font-wide">
        Brought to you by
      </p>
      <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
        <div className="flex items-center justify-start">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <img
              src="/next.svg"
              alt="Next.js Logo"
              className="h-12 dark:text-white text-black dark:hidden"
            />
            <img
              src="/nextjs.svg"
              alt="Next.js Logo"
              className="h-12 dark:text-white text-black hidden dark:block"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercell.svg"
              alt="Vercel.com Logo"
              className="h-6 dark:text-white text-black dark:hidden"
            />
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="h-6 dark:text-white text-black hidden dark:block"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <img
              src="/stripel.svg"
              alt="stripe.com Logo"
              className="h-12 dark:text-white text-black dark:hidden"
            />
            <img
              src="/stripe.svg"
              alt="stripe.com Logo"
              className="h-12 dark:text-white text-black hidden dark:block"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <img
              src="/supabasel.svg"
              alt="supabase.io Logo"
              className="h-10 dark:text-white text-black dark:hidden"
            />
            <img
              src="/supabase.svg"
              alt="supabase.io Logo"
              className="h-10 dark:text-white text-black hidden dark:block"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://github.com" aria-label="github.com Link">
            <img
              src="/github.svg"
              alt="github.com Logo"
              className="h-8 dark:text-white text-black hidden dark:block"
            />
            <img
              src="/githubl.svg"
              alt="github.com Logo"
              className="h-8 dark:text-white text-black dark:hidden"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
