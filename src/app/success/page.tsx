"use client"

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [isError, setIsError] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null); // Define sessionId as string or null
  const searchParams = useSearchParams();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    setSessionId(session_id); // session_id can be string or null, matches the type string | null
  }, [searchParams]);

  const confirmOrderCreate = async () => {
    try {
      if (!sessionId) {
        return; // Guard clause if sessionId is null, do nothing
      }

      const response = await axios.post("/api/stripe-sessions", {
        sessionId,
      });
      toast.success(response.data);
    } catch (error) {
      setIsError(true);
      toast.error("Error storing data in database");
      console.log("Axios Error", error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      confirmOrderCreate();
    }
  }, [sessionId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
