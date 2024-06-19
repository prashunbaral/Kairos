import { useAppSelector } from '@/redux/hooks';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropsType, searchParams: { query?: string } = {}) => {

  const query = searchParams?.query || '';

  const cartCount = useAppSelector((state) => state.cartReducer.length);
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("google"); 
  };

  return (
    <div className='pt-4 bg-white top-0 sticky'>
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">Kairos</div>
          {/* <SearchBar /> */}
          <div className='text-black flex justify-center ml-32'> {/* Center navigation elements */}
            <Link
              href="#Products"
              className='font-bold hover:text-blue-500 mt-1'
            >
              Products
            </Link>

            <Link
              href="#NewArrivals"
              className='font-bold hover:text-blue-500 ml-5 mt-1'
            >
              New Arrivals
            </Link>

            <Link
              href="#ContactUs"
              className='font-bold hover:text-blue-500 ml-5 mt-1'
            >
              Contact Us
            </Link>

            <div className='flex space-x-5 ml-64 mr-6'> 
              <FaFacebook href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaInstagram href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaYoutube href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaTiktok href='#' className='cursor-pointer size-8 hover:text-blue-500' />
            </div>
          </div>

          <div className='flex gap-4 md:gap-8 items-center'>
            <div className='md:flex hidden gap-3'>
              {/* User authentication section */}
              {status === 'loading' && (
                <p className='text-gray-500'>Loading...</p>
              )}
              {status === 'authenticated' && (
                <>
                  <div className='rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center'>
                    <MdOutlineAccountCircle />
                  </div>
                  <div>
                    <p className='text-gray-500 mt-3 uppercase'>{session.user?.name}</p>
                  </div>
                </>
              )}
              {status === 'unauthenticated' && (
                <button className='text-gray-500 mt-3 hover:text-black' onClick={handleSignIn}>
                  Sign in
                </button>
              )}
            </div>
            <div className='text-gray-500 text-[32px] relative cursor-pointer' onClick={() => setShowCart(true)} >
              <FaShoppingCart />
              <div className='absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center'>
                {cartCount}
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-gray-200 pt-4'></div>
      </div>
    </div>
  );
};

export default Navbar;
