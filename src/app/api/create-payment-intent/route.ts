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
            success_url: 'https://example.com/success?token='+customer.id,
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
                        unit_amount: data.price,
                    },
                }]
        });
        return NextResponse.json({msg:checkoutsession , url: checkoutsession.url}, {status: 200})

    }catch(e:any){
        return NextResponse.json({error: e.message}, {status: 500})
        
    }
}