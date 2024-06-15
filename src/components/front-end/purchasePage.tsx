import Product from "@/libs/models/Product";
import { notFound } from "next/navigation";
import stripe from "stripe";
import { CheckoutForm } from "./CheckoutForm";
import router from "next/router";
import { paymentIntents } from "stripe"

export default async function Purchase({ params: { id } }: { params: { id: string } }) {
    try {
      const product = await Product.findById({ where: { id } });
  
      if (!product) {
        return notFound(); // Handle product not found
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: 'CAD',
        metadata: { productId: product.id },
      });
  
      return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      router.push('/error'); // Redirect to error page
    }
  }