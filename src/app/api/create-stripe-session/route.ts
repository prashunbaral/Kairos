import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(key, {
  apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
  const { headers } = request;
  console.log("Request Headers:", headers);

  try {
    const body = await request.json();
    console.log("Request Body:", body);

    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: "shr_1PSEIGDjx1CAeQkrjbbaQHhG" },
          { shipping_rate: "shr_1PSENoDjx1CAeQkr59aQHDN6" }
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item: any) => {
          return {
            price_data: {
              currency: 'CAD',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 5,
            }
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${headers.get("origin")}/?success=true`,
        cancel_url: `${headers.get("origin")}/?canceled=true`,
      });
      
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }

  } catch (err: any) {
    console.error("Error parsing request or creating Stripe session:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
  }
}
