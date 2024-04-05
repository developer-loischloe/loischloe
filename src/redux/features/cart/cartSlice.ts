import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { toast } from "sonner";

export interface Item {
  product: any;
  price: number;
  quantity: number;
}

export const getLocalCartItems = () => {
  let localCartItems = "[]";
  if (typeof window !== "undefined") {
    localCartItems = sessionStorage.getItem("cart") || "[]";
  }

  return JSON.parse(localCartItems);
};

export const setLocalCartItems = (items: Item[]) => {
  sessionStorage.setItem("cart", JSON.stringify(items));
};

export const checkItemExistOrNot = ({
  items,
  currentProductId,
}: {
  items: Item[];
  currentProductId: string;
}) => {
  return items.find((item: Item) => item?.product?.$id === currentProductId);
};

// Define a type for the slice state
export interface CartState {
  cartList: Item[];
  cartCost: {
    product_price: number;
    shipping_cost: number;
    total_cost: number;
  };
}

// Define the initial state using that type
const initialState: CartState = {
  cartList: getLocalCartItems() || [],
  cartCost: {
    product_price: 0,
    shipping_cost: 0,
    total_cost: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const itemExist = checkItemExistOrNot({
        items: state.cartList,
        currentProductId: action.payload?.product?.$id,
      });

      let cartList: Item[] = [];
      if (itemExist) {
        cartList = state.cartList.map((item: Item) => {
          if (item?.product?.$id === action.payload.product?.$id) {
            item.quantity = action.payload.quantity;
          }
          return item;
        });
        toast("Item quantity updated.");
      } else {
        cartList = [...state.cartList, action.payload];
        toast("Item added to your cart.");
      }

      state.cartList = cartList;
      setLocalCartItems(cartList);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const itemExist = checkItemExistOrNot({
        items: state.cartList,
        currentProductId: action.payload?.productId,
      });

      if (itemExist) {
        let cartList = state.cartList.filter(
          (item: { product: any; quantity: number }) =>
            item.product.$id !== action.payload.productId
        );

        state.cartList = cartList;
        setLocalCartItems(cartList);
        toast("Item remove from cart.");
      }
    },
    resetCart: (state) => {
      state.cartList = [];
      setLocalCartItems([]);
    },
    updateCartCost: (
      state,
      action: PayloadAction<{
        product_price?: number;
        shipping_cost?: number;
      }>
    ) => {
      if (action.payload.product_price) {
        state.cartCost.product_price = action.payload.product_price;
      }

      if (action.payload.shipping_cost) {
        state.cartCost.shipping_cost = action.payload.shipping_cost;
      }

      state.cartCost.total_cost =
        state.cartCost.product_price + state.cartCost.shipping_cost;
    },
  },
});

export const { addToCart, removeFromCart, resetCart, updateCartCost } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartList = (state: RootState) => state.cart.cartList;
export const selectCartCost = (state: RootState) => state.cart.cartCost;

export default cartSlice.reducer;
