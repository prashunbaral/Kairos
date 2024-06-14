"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '@/redux/features/orderSlice';

interface RootState {
  order: OrderState;
}

interface propsType {
  id: string;
  img: string;
  status: string;
  title: string;
  price: number;
}

const Orders = () => {
  const selectedProduct = useSelector((state: RootState) => state.order.selectedProduct);
  return (
    <div>
      {selectedProduct ? (
        <div>
          <h2>Order Details</h2>
          <p>Product ID: {selectedProduct.id}</p>
          <p>Product Title: {selectedProduct.title}</p>
          <p>Product Price: ${selectedProduct.price}</p>
          {/* Add buttons or forms for processing the order */}
        </div>
      ) : (
        <p>No product selected yet.</p>
      )}
    </div>
  );
}

export default Orders