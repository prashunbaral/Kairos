import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    imgSrc:{
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    customerName: {
        type: String,
        require: true,
    },
    customerEmail: {
        type: String,
        require: true,   
    },
    shippingAddress: {
        type: String,
        require: true,
    },
});

const anOrder = models.Order || model("Order", orderSchema);

export default anOrder;