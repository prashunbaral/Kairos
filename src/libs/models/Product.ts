import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    imgSrc:{
        type: String,
        require: true,
    },
    fileKey: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    navCategory: {
        type: String,
        require: true,
        default: "nothing"
    },
    subNavCategory: {
        type: String,
        require: true,
        default: "nothing"

    }
});

const Product = models.Product || model("Product", productSchema);

export default Product;