import { makeToast } from "@/utils/helper";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface propsType {
    id: string;
    img: string;
    category: string;
    title: string;
    price: number;
}

const stripe = require ("stripe")(process.env.STRIPE_SECRET_KEY)

async function CreateStripeSession (req: NextRequest, res: NextResponse, {  title, price }:propsType) {


    // : paxi actual domain rakhne
    const redirectionURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000': 'http://localhost:3000'

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/get_products')
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => console.log(err)
            )
    }, [])

    const transformedProduct = {
        price_data: {
            current: 'Ca',
            product_data: {
                title: title,
                price: price,
            }
        }
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedProduct],
        mode: 'payment',
        success_url: redirectionURL + '?status=success' && makeToast("Order Placed Successfully"),
        cancel_url: redirectionURL + '?status=cancel' && toast.error("An error occured"),
    })

}