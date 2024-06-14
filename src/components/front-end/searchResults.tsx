"use server"

import mongoose from "mongoose"
import TrendingProducts from "./TrendingProducts"
import { connectMongoDB } from "@/libs/MongoConnect"
import Product from "@/libs/models/Product"
import { NextResponse } from "next/server"

export default async function searchResults() {
    try {
        await connectMongoDB()
        const data = await Product.find()
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