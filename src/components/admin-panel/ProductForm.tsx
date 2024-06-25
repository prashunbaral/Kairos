"use client";

import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch } from '@/redux/hooks';
import { makeToast } from '@/utils/helper';
import React, { FormEvent, useState } from 'react'
import axios from "axios";
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';

interface IPayload {
    imgSrc: null | string;
    fileKey: null | string;
    name: string;
    category: string;
    price: string;
    navCategory: string;
    subNavCategory: string;
}

const ProductForm = () => {

    const [payload, setPayload] = useState<IPayload>({
        imgSrc: null,
        fileKey: null,
        name: "",
        category: "",
        price: "",
        navCategory: "",
        subNavCategory: "",
    })

    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(setLoading(true));
        console.log(payload);
        
        
        axios.post("/api/add_product", payload).then(res => {
            makeToast("Product Added Successfully")
            setPayload({
                imgSrc: null,
                fileKey: null,
                name: "",
                category: "",
                price: "",
                navCategory: "",
                subNavCategory: "",
            })
        }).catch(err => console.log(err)
        ).finally(() => dispatch(setLoading(false)))
    }
  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <Image className='max-h-[300px] w-auto object-contain rounded-md' src={payload.imgSrc ? payload.imgSrc : "/placeholder.png"} width={800} height={500} alt='product'/>

        <UploadButton 
            endpoint="imageUploader"
            onClientUploadComplete = {(res) => {
                console.log(res);

                setPayload({
                    ...payload,
                    imgSrc: res[0]?.url,
                    fileKey: res[0]?.key,
                })
                
            }}
            onUploadError={(error: Error) => {
                console.log(`ERROR! ${error}`);
                
            }}
        />
        <div>
            <label className='block ml-1'>
                Product Name
            </label>
            <input className='bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md' type='text' value={payload.name} onChange={(e) => setPayload({...payload, name: e.target.value})}
                required
            />
        </div>

        <div>
            <label className='block ml-1'>
                Product Description
            </label>
            <textarea className='bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md' value={payload.category} onChange={(e) => setPayload({...payload, category: e.target.value})}
                required
            />
        </div>

        <div>
            <label className='block ml-1'>
                Product Price
            </label>
            <input className='bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md' type='text' value={payload.price} onChange={(e) => setPayload({...payload, price: e.target.value})}
                required
            />
        </div>

        <div>
            <label className='block ml-1'>
                Product Category
            </label>
            <input className='bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md' type='text' value={payload.navCategory} onChange={(e) => setPayload({...payload, navCategory: e.target.value})}
                required
            />
        </div>

        <div>
            <label className='block ml-1'>
                Product SubCategory
            </label>
            <input className='bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md' type='text' value={payload.subNavCategory} onChange={(e) => setPayload({...payload, subNavCategory: e.target.value})}
                required
            />
        </div>

        <div className='flex justify-end'>
            <button className='bg-pink-600 text-white px-8 py-2 rounded-md'>Add</button>
        </div>

    </form>
  )
}

export default ProductForm