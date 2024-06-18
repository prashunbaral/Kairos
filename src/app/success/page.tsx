"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
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
    <Suspense fallback={<div>Loading ...</div>}>
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
    </Suspense>
  );
};

export default Page;
