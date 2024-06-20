"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import { makeToast } from "@/utils/helper";
import { set } from "mongoose";
import { signIn, useSession } from "next-auth/react";

type props = {
  img: string;
  category: string;
  title: string;
  price: number;
  priceId: string;
};

const BuyButton = ({ img, category, title, price, priceId }: props) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

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

  const handleSignIn = () => {
    signIn("google")
  }

  return (
    <div
      className="bg-pink-500 hover:bg-blue-500 flex items-center justify-center p-2 cursor-pointer text-white w-[100px] ml-44 mb-2"
      onClick={() => {
        if(status === 'authenticated') {
          checkout();
          if (!loading) {
            makeToast("Processing Transaction...");
          } else {
            makeToast("Order Placed Successfully");
          }
        } else {
          handleSignIn();
        }
        
      }}
    >
      <FaDollarSign /> Buy Now
    </div>
  );
};

export default BuyButton;