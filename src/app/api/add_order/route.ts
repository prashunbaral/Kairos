import { connectMongoDB } from "@/libs/MongoConnect";
import Order from "@/libs/models/Orders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { id, imgSrc, name, status, price, navCategory, subNavCategory } = body;

        await connectMongoDB()
        const data = await Order.create({
            id, imgSrc, name, status, price, navCategory, subNavCategory
        })
        return NextResponse.json({msg: "Order Placed Successfully", data});
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Something went wrong",
        }, 
        {status: 400}
    )
    }
}