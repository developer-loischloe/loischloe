import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Interface
interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  district: string;
  upozila: string;
  address: string;
  order_notes: string;
}

// Define a type for the slice state
export interface ShippingState {
  shippingInfo: ShippingInfo;
}

// Define the initial state using that type
const initialState: ShippingState = {
  shippingInfo: {
    name: "",
    phone: "",
    email: "",
    district: "",
    upozila: "",
    address: "",
    order_notes: "",
  },
};

export const shippingSlice = createSlice({
  name: "shippingInfo",
  initialState,
  reducers: {
    addShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      let shippingInfo = { ...state.shippingInfo, ...action.payload };

      state.shippingInfo = shippingInfo;
    },
  },
});

export const { addShippingInfo } = shippingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShippingInfo = (state: RootState) =>
  state.shipping.shippingInfo;

export default shippingSlice.reducer;
