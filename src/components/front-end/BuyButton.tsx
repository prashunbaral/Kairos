"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import { makeToast } from "@/utils/helper";
import { set } from "mongoose";

type props = {
  img: string;
  category: string;
  title: string;
  price: number;
  priceId: string;
};

const BuyButton = ({ img, category, title, price, priceId }: props) => {
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    try {
      const response = await axios.post("/api/create-payment-intent", {
        name: title,
        price: price,
        image: img,
        description: category,
      });
      const data = response.data;
      console.log(data);

      // const stripeSessionRetrived = await axios.post('/api/stripe-sessions', { stripeId: data.msg.id })
      // console.log("retriveds session", stripeSessionRetrived)

      window.location.href = data.url; 
      if (!data.ok) throw new Error("Something went wrong");
      const stripe = await loadStripe(
        "pk_test_51P0dDDDjx1CAeQkrcs1uxNzUMpSnhIbPavZVP06hGOVWqTmz3GshKzufhp9vlsLuj9A9jYzno9qovAzg5SAvHxqC00PN2Kfzxt"
      );
      if (!stripe) {
        return;
      }
      await stripe.redirectToCheckout({
        sessionId: data.msg.id,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const stripe = await loadStripe(
      "pk_test_51P0dDDDjx1CAeQkrcs1uxNzUMpSnhIbPavZVP06hGOVWqTmz3GshKzufhp9vlsLuj9A9jYzno9qovAzg5SAvHxqC00PN2Kfzxt"
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await axios.post("/api/create-stripe-session", {
        img: img,
        category: category,
        title: title,
        price: price,
        priceId: priceId,
      });
      const data = response.data;
      console.log(data);
      setLoading(true);
      if (!data.ok) throw new Error("Something went wrong");

      await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-pink-500 hover:bg-blue-500 flex items-center justify-center p-2 cursor-pointer text-white w-[100px] ml-44 mb-2"
      onClick={() => {
        checkout();
        if (!loading) {
          makeToast("Processing Transaction...");
        } else {
          makeToast("Order Placed Successfully");
        }
      }}
    >
      <FaDollarSign /> Buy Now
    </div>
  );
};

export default BuyButton;