import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router'; // Import for handling redirection
import Product from '@/libs/models/Product';
import { notFound } from 'next/navigation';
import stripe from 'stripe';

type CheckoutFormProps = {
  product: {};
  clientSecret?: string;
};

const stripePromise = loadStripe("pk_test_51P0dDDDjx1CAeQkrcs1uxNzUMpSnhIbPavZVP06hGOVWqTmz3GshKzufhp9vlsLuj9A9jYzno9qovAzg5SAvHxqC00PN2Kfzxt");

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Access router for redirection

  useEffect(() => {
    if (!clientSecret) {
      setIsLoading(true);
      // Handle client secret fetching logic (adjust as needed)
      // ...
      setIsLoading(false);
    }
  }, [clientSecret]);

  return (
    <>
      {isLoading ? (
        <p>Loading checkout form...</p>
      ) : clientSecret ? (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form />
        </Elements>
      ) : (
        <p>Error: Client secret not available.</p>
      )}
    </>
  );
}

function Form() {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form>
      {stripe && elements && (
        <PaymentElement />
      )}
    </form>
  );
}


