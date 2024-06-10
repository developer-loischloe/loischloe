import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sendGTMEvent } from "@next/third-parties/google";
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

const checkIsEligibleForFreeGift = (cartList: Item[]) => {
  const filteredItems = cartList.filter((item: Item) => {
    return item.product.parent_category !== "offer";
  });

  const filteredItemsTotalPrice = filteredItems.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  return filteredItemsTotalPrice >= 2500;
};

const checkIsAlreadyGiftClaimed = (cartList: Item[]) => {
  const filteredItems = cartList.filter((item: Item) => {
    return item.product.sale_price === 0;
  });

  return filteredItems.length > 0;
};

// Define a type for the slice state
export interface CartState {
  cartList: Item[];
  cartCost: {
    product_price: number;
    shipping_cost: number;
    total_cost: number;
  };
  showCartSidebar: boolean;
  isEligibleForFreeGift: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  cartList: getLocalCartItems() || [],
  cartCost: {
    product_price: 0,
    shipping_cost: 0,
    total_cost: 0,
  },
  showCartSidebar: false,
  isEligibleForFreeGift: false,
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
        // toast("Item quantity updated.");
      } else {
        cartList = [...state.cartList, action.payload];
        // toast("Item added to your cart.");
        sendGTMEvent({ event: "AddToCart", product: action.payload.product });
      }

      const isEligibleForFreeGift = checkIsEligibleForFreeGift(cartList);

      if (!isEligibleForFreeGift) {
        cartList = cartList.filter((item: Item) => {
          return item.price !== 0;
        });
      }

      const isAlreadyGiftClaimed = checkIsAlreadyGiftClaimed(cartList);

      state.isEligibleForFreeGift =
        isEligibleForFreeGift && !isAlreadyGiftClaimed;
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

        const isEligibleForFreeGift = checkIsEligibleForFreeGift(cartList);
        if (!isEligibleForFreeGift) {
          cartList = cartList.filter((item: Item) => {
            return item.price !== 0;
          });
        }

        const isAlreadyGiftClaimed = checkIsAlreadyGiftClaimed(cartList);

        state.isEligibleForFreeGift =
          isEligibleForFreeGift && !isAlreadyGiftClaimed;
        state.cartList = cartList;

        setLocalCartItems(cartList);
        toast(`${itemExist?.product?.name} is removed from your cart.`);
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
    setShowCartSidebar: (
      state,
      action: PayloadAction<{
        show: boolean;
      }>
    ) => {
      state.showCartSidebar = action.payload.show;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  updateCartCost,
  setShowCartSidebar,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartList = (state: RootState) => state.cart.cartList;
export const selectCartCost = (state: RootState) => state.cart.cartCost;
export const selectShowCartSidebar = (state: RootState) =>
  state.cart.showCartSidebar;
export const selectIsEligibleForFreeGift = (state: RootState) =>
  state.cart.isEligibleForFreeGift;

export default cartSlice.reducer;
