import Pricing from "@/components/pricing";
import {
  getSession,
  getSubscriptions,
  getActiveProductsWithPrices,
} from "@/app/supabase-server";
import SiteFooter from "@/components/footer";

export default async function PricingPage({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const [session, products, subscriptions] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscriptions(),
  ]);

  return (
    <>
      <Pricing
        lng={lng}
        session={session}
        user={session?.user}
        products={products}
        subscriptions={subscriptions}
      />
      <SiteFooter lng={lng} />
    </>
  );
}
