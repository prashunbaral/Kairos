// appState.ts
import { createSlice } from "@reduxjs/toolkit";

export interface OrderState {
  selectedProduct: Product | null;
}

interface Product {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
}

const initialState: OrderState = {
  selectedProduct: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = orderSlice.actions;
export default orderSlice.reducer;
