import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? "",
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2024-06-20",
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: "Peyronnet Account",
      version: "1.0.0",
    },
  }
);
