    "use client";
    import axios from "axios";
    import Link from "next/link";
    import { useSearchParams } from "next/navigation";
    import React, { Suspense, useEffect, useState } from "react";
    import toast from "react-hot-toast";

    // const Page = () => {
    //   const [isError, setIsError] = useState(false);
    //   const [sessionId, setSessionId] = useState<string | null>(null);
    //   const searchParams = useSearchParams();

    //   useEffect(() => {
    //     // Function to fetch session ID asynchronously
    //     const fetchSessionId = async () => {
    //       const session_id = searchParams.get("session_id");
    //       setSessionId(session_id);
    //     };

    //     fetchSessionId(); // Call the function to fetch session ID
    //   }, [searchParams]);

    //   const confirmOrderCreate = async () => {
    //     try {
    //       if (!sessionId) {
    //         return; // If session ID is null, do not proceed
    //       }

    //       const response = await axios.post("/api/stripe-sessions", {
    //         sessionId,
    //       });
    //       toast.success(response.data);
    //     } catch (error) {
    //       setIsError(true);
    //       toast.error("Error storing data in database");
    //       console.log("Axios Error", error);
    //     }
    //   };

    //   useEffect(() => {
    //     if (sessionId) {
    //       confirmOrderCreate(); // Call confirmOrderCreate when session ID is set
    //     }
    //   }, [sessionId]);

    //   return (
    //     <Suspense fallback={<p>Loading...</p>}>
    //       <div>
    //         {isError ? (
    //           <div className="h-screen w-full flex items-center justify-center">
    //             <p className="text-3xl text-red-500">
    //               Error Storing the order in database. Contact the developer
    //             </p>
    //           </div>
    //         ) : (
    //           <div className="h-screen w-full flex items-center justify-center flex-col">
    //             <p className="text-3xl text-green-500">Payment Successful. </p>
    //             <Link href={"/"}>Go to HomePage</Link>
    //           </div>
    //         )}
    //       </div>
    //     </Suspense>
    //   );
    // };

    

    // export default Page;

    const Page = () => {
      const [isError, setIsError] = useState(false);
      const [sessionId, setSessionId] = useState<string | null>(null);
      const searchParams = useSearchParams();
    
      useEffect(() => {
        const fetchSessionId = async () => {
          const session_id = searchParams.get("session_id");
          setSessionId(session_id);
        };
    
        fetchSessionId();
      }, [searchParams]);
    
      const confirmOrderCreate = async () => {
        try {
          if (!sessionId) {
            return;
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
    
    export default function WrappedPage() {
      return (
        <Suspense fallback={<p>Loading...</p>}>
          <Page />
        </Suspense>
      );
    }
    
