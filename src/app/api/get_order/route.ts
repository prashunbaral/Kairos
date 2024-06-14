import { connectMongoDB } from "@/libs/MongoConnect";
import Order from "@/libs/models/Orders";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB()
        const data = await Order.find()
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Something went wrong",
        }, 
        {status: 400}
    )
    }
}