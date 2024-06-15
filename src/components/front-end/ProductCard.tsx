"use client"

import {
    AiFillStar,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { FormEvent, useState } from "react";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { makeToast } from "@/utils/helper";
import BuyButton from "./BuyButton";
import { signIn } from "next-auth/react";

interface propsType {
    id: string;
    img: string;
    category: string;
    title: string;
    price: number;
}

const ProductCard = ({ id, img, category, title, price }: propsType) => {

    const dispatch = useAppDispatch();

    const addProductToCart = () => {
        const payload = {
            id,
            img,
            title,
            price,
            quantity: 1,
        };
        dispatch(addToCart(payload));
        toast.success("Added to Cart");
    }

    const handleBuyNow = async (e: FormEvent) => {
        e.preventDefault();
      
        const orderData = {
          id: id,
          imgSrc: img,
          name: title,
          status: "pending",
          price: price,
        };
      
        try {
          const response = await axios.post("/api/add_order", orderData);
          const orderId = response.data.id; 
          makeToast("Order Placed Successfully")
            
          //window.location.href = "https://buy.stripe.com/test_6oEbIU8DNa8Q9vW6oo";
        } catch (err) {
          console.error("Error creating order:", err);
          toast.error("Something went wrong. Please try again later.");
        } finally {
          dispatch(setLoading(false));
        }
      };
      
      
    return (
        <div className="border border-gray-200">
            <div className="text-center border-b border-gray-200">
                <img className="inline-block" src={img} alt={title} width={200} height={200} />
            </div>

            <div className="px-8 py-4">
                <h2 className="font-medium">{title}</h2>
                <p className="text-gray-500 text-[14px] font-medium">{category}</p>

                <div className="mt-3 flex text-[#FFB21D] items-center">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <p className="text-gray-600 text-[14px] ml-2">(3 Review)</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <h2 className="font-medium text-blue text-xl">
                        ${price}
                    </h2>
                    <div className="flex gap-2 items-center bg-pink-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-500" onClick={addProductToCart}>
                        <AiOutlineShoppingCart /> Add To Cart
                    </div>
                    
                </div>
                
            </div>
            <button onClick={handleBuyNow}>
               <BuyButton 
                img={img} category={category} price={price} title={title} priceId="price_1PRUavDjx1CAeQkrRXVbJpY7"
            /> 
            </button>
            
        </div>
    )
}

export default ProductCard;