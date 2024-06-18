// "use client"
// import React, { useState } from 'react';

// interface props {
//   name: string;
//   imgSrc: string;
//   price: string;
//   description: string;
// }

// const UserForm = ( {name, imgSrc, price, description}:props ) => {

//   const orderData = {
//     name: name,
//     imgSrc: imgSrc,
//     price: price,
//     description: description,
//   }

//   console.log(orderData);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const handleChange = (event: any) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   return (
//     <div className="form-container">
//       <h2>User Information</h2>
//       <form>
//         <div className="form-group">
//           <label className="form-label" htmlFor="name">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-input"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-input"
//             id="email"
//             name="email"
//             placeholder="Enter your email address"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label" htmlFor="phone">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             className="form-input"
//             id="phone"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label" htmlFor="address">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="form-input"
//             id="address"
//             rows={4}
//             placeholder="Enter your address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit (For Demonstration Only)</button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

    const confirmOrderCreate = async () => {
      try {
        const response = await axios.post("/api/stripe-sessions", {
          sessionId,
        });
        // const data = await response.json(
        console.log(response);
        toast.success(response.data)
        console.log("Response", response.data);
      } catch (error) {
        setIsError(true);
        toast.error("Error storing data in database")
        console.log("Axios Error", error);
      }
    };
    confirmOrderCreate();

  return (
    <div>
      {isError ? (
        <div className="h-screen w-full flex items-center justify-center">
          <p className="text-3xl text-red-500">
            Error Storing the order in database. Contact the developer
          </p>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center flex-col">
          <p className="text-3xl text-green-500">Payment Successful. </p>
          <Link href={"/"}>Go to HomePage</Link>
        </div>
      )}
    </div>
  );
};

export default page;
