import Pricing from "@/components/pricing";
import {
  getProducts,
  getSubscriptions,
  getUser,
} from "@/utils/supabase/queries";

import SiteFooter from "@/components/footer";
import { createClient } from "@/utils/supabase/server";

export default async function PricingPage({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const supabase = createClient();
  const [user, products, subscriptions] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscriptions(supabase),
  ]);

  return (
    <>
      <Pricing
        lng={lng}
        user={user}
        products={products}
        subscriptions={subscriptions}
      />
      <SiteFooter lng={lng} />
    </>
  );
}
