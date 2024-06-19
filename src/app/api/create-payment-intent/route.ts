import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface bodyData{
    name:string;
    price:number;
    image:string;
    description:string;
}

export const POST = async (request:NextRequest)=>{

    try{
        const data:bodyData = await request.json();
        
        const productDetails = {
            name: data.name,
            images: [data.image],
            description: data.description,
            price: data.price

        }
        

        const customer = await stripe.customers.create({
            email: "customer@example.com",
            address: {
                city: "Bangalore",
                country: "India",
                line1: "1234 Main Street",
                line2: "Apt. 430",
                postal_code: "560001",
                state: "Karnataka"
                },
            name: 'john doe'
        });

        const checkoutsession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/cancel?token='+customer.id,
            line_items: [
              {
                quantity: 1,
                price_data: {
                  product_data: {
                    name: data.name,
                    images: [data.image],
                    description: data.description,
                  },
                  currency: 'usd',
                  unit_amount: data.price * 100,
                },
              }
            ],
            billing_address_collection: 'required',
            shipping_address_collection: {
              allowed_countries: ['CA', 'US'],
            },
            metadata: {
              description: JSON.stringify(productDetails)
            }
          });
          
        console.log("Hello after session")
  
        return NextResponse.json({msg:checkoutsession , url: checkoutsession.url}, {status: 200})

    }catch(e:any){
        return NextResponse.json({error: e.message}, {status: 500})
        
    }
}