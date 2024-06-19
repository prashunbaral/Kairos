import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/libs/models/Orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface IOrderDetails {
  name: string;
  images: [string];
  description: string;
  price: string;
  clientName: string;
}

export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();
  if (!sessionId) {
    return new NextResponse("Session ID missing");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  console.log("Session from server", session);
  const orderMetaData = JSON.stringify(session.metadata);
  const description = JSON.parse(orderMetaData);
  const orderDetails: IOrderDetails = JSON.parse(description.description);

  // Check for existing order before creating a new one
  const existingOrder = await Order.findOne({ sessionId });
  if (existingOrder) {
    console.log("Order already exists:", existingOrder);
    // Handle duplicate order scenario (e.g., inform user or log the event)
    return NextResponse.json("Order already placed", { status: 200 });
  }

  if (session.status?.toLowerCase() === "complete" && !existingOrder?.completed) {
    // Proceed with order creation logic only if order is complete and doesn't exist yet
    const createCompleteOrder = await Order.create({
      name: orderDetails.name,
      imgSrc: orderDetails.images[0],
      status: "completed",
      price: orderDetails.price,
      customerName: session.customer_details?.name,
      customerEmail: session.customer_details?.email,
    });

    if (createCompleteOrder) {
      console.log("Order created successfully");
      return NextResponse.json("Order placed to database Successfully", {
        status: 200,
      });
    }

    console.log(
      "Failed to store successful order in database",
      orderDetails
    );
    return NextResponse.json(
      { error: "Failed to place order in database", details: orderDetails },
      { status: 400 }
    );
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
