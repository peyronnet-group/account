import SiteFooter from "@/components/footer";
import Pricing from "@/components/pricing";
import { DefaultLanguageParams } from "@/lib/languages";
import {
  getProducts,
  getSubscriptions,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function PricingPage({
  params,
}: {
  params: DefaultLanguageParams;
}) {
  const { lng } = await params;
  const supabase = await createClient();
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
