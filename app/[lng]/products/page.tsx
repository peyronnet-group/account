import Pricing from "@/components/pricing";
import {
  getSession,
  getSubscriptions,
  getActiveProductsWithPrices,
} from "@/app/supabase-server";

export default async function PricingPage() {
  const [session, products, subscriptions] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscriptions(),
  ]);

  return (
    <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscriptions={subscriptions}
    />
  );
}
