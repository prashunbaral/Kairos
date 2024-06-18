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
<<<<<<< HEAD
        const productDetails = {
            name: data.name,
            images: [data.image],
            description: data.description,
            price: data.price

        }
        

        const customer = await stripe.customers.create({
=======

        const customer = await stripe.customers.create({

>>>>>>> bb2e386ce5db12dda5bfa35a943edf884f133bc1
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
<<<<<<< HEAD
<<<<<<< HEAD
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
=======
            success_url: 'http://localhost:3000/sucess',
>>>>>>> 49844e7 (added confirmation page)
=======
            success_url: 'http://localhost:3000/sucess',
>>>>>>> bb2e386ce5db12dda5bfa35a943edf884f133bc1
            cancel_url: 'https://example.com/cancel?token='+customer.id,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        product_data: {
                            name: data.name,
                            images: [data.image],
                            description: data.description,
<<<<<<< HEAD
                        },
                        currency: 'usd',
                        unit_amount: data.price * 100,
                    },
                }],
            metadata: {
                 description: JSON.stringify(productDetails)
            }
        });
        console.log("Hello after session")

        
        
=======
                            
                        },
                        currency: 'usd',
                        unit_amount: data.price,
                    },
                }]
        });
>>>>>>> bb2e386ce5db12dda5bfa35a943edf884f133bc1
        return NextResponse.json({msg:checkoutsession , url: checkoutsession.url}, {status: 200})

    }catch(e:any){
        return NextResponse.json({error: e.message}, {status: 500})
        
    }
}