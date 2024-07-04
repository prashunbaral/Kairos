"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/front-end/ProductCard";
import Navbar from "@/components/front-end/Navbar";
import { set } from "mongoose";
import Cart from "@/components/front-end/Cart";

interface ICategory {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  subNavCategory: string;
  price: number;
}

const Page = () => {
  const [products, setProducts] = useState<ICategory[]>([]);
  const [categoryParam, setCategoryParam] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  let nestedProducts: ICategory[] = [];
  useEffect(() => {
    axios
      .get("/api/get_products")
      .then((res) => {
        console.log("working");
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let urlParams;
    if (typeof window !== "undefined") {
      urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");
      setCategoryParam(categoryParam);
    }
  }, []);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const categoryParam = urlParams.get("category");

  for (let i = 0; i < products.length; i++) {
    if (products[i].subNavCategory.replace(" ", "-") == categoryParam) {
      nestedProducts.push(products[i]);
    }
  }

  console.log(nestedProducts);
  return (
    <>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <div className="container mt-20" id="Products">
        <div className="sm:flex justify-between items-center bg-[#a72f04] p-2 text-white">
          <h2 className="text-4xl font-medium">
            {categoryParam?.replace("-", " ")} Products
          </h2>

          <div className="text-gray-300 flex gap-4 text-xl mt-4 sm:mt-0">
            <p className="text-gray-300 italic">
              “ A step towards a healthy future ”
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {nestedProducts.map((item: ICategory) => (
            <ProductCard
              key={item._id}
              id={item._id}
              img={item.imgSrc}
              category={item.subNavCategory}
              title={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
