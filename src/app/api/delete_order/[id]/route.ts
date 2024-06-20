import { connectMongoDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import Orders from '@/libs/models/Orders'

export async function DELETE(request: NextRequest, URLParams: any) {
    try {
        const id = URLParams.params.id;
        console.log(`Deleting order with ID: ${id}`);

        await connectMongoDB()
        const deletedOrder = await Orders.findByIdAndDelete(id);

        if (!deletedOrder) {
            console.log(`Order with ID ${id} not found`);
            return NextResponse.json({ msg: "Order not found" }, { status: 404 });
        }

        console.log(`Order with ID ${id} deleted successfully`);
        return NextResponse.json({ msg: "Order Deleted Successfully" });
    } catch (error) {
        console.error(`Error deleting order: ${error}`);
        return NextResponse.json({
            error,
            message: "Something went wrong",
        }, { status: 400 });
    }
}