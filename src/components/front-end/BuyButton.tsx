import { POST } from "@/app/api/add_order/route";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { FaDollarSign } from "react-icons/fa";

type props = {
    img: string;
    category: string;
    title: string;
    price: number;
    priceId: string;
}

const BuyButton = ({img, category, title, price, priceId}: props) => {

    const { data: session, status } = useSession();
    const handleSignIn = () => {
        signIn("google"); 
      };
     

    const handleSubmit = async () => {
        // const stripe = await loadStripe(
        //     "pk_test_51P0dDDDjx1CAeQkrcs1uxNzUMpSnhIbPavZVP06hGOVWqTmz3GshKzufhp9vlsLuj9A9jYzno9qovAzg5SAvHxqC00PN2Kfzxt"
        // );
        // if(!stripe){
        //     return;
        // }
        // try {
        //     const response = await axios.post('/api/create-stripe-session', {
        //         img:img,
        //         category: category,
        //         title: title,
        //         price: price,
        //         priceId: priceId,
        //     });
        //     const data = response.data;
        //     console.log(data);
            
        //     if(!data.ok) throw new Error("Something went wrong");
            
        //     await stripe.redirectToCheckout({
        //         sessionId: data.result.id
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

  return (
    <>
        {status === 'authenticated' && (
            <div className="bg-pink-500 hover:bg-blue-500 flex items-center justify-center p-2 cursor-pointer text-white w-[100px] ml-44 mb-2" onClick={handleSubmit}>
                <FaDollarSign /> Buy Now
            </div>
        )}
        {status === 'unauthenticated' && (
            <div className="bg-pink-500 hover:bg-blue-500 flex items-center justify-center p-2 cursor-pointer text-white w-[100px] ml-44 mb-2" onClick={handleSignIn}>
            <FaDollarSign /> Buy Now
        </div>
        )}
    </>
    
  )
}

export default BuyButton
