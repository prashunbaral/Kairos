import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripePromise = () => {
  const key = process.env.STRIPE_URI || "";

  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripePromise;