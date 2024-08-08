import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sendGTMEvent } from "@next/third-parties/google";
import { shippingCostProvider } from "@/lib/utils";
import { toast } from "sonner";
import appwriteUtilsService from "@/appwrite/appwriteUtilsService";

// Types
export interface Item {
  product: any;
  price: number;
  quantity: number;
}

// Utility function
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

export const calculateProductPrice = (
  cartList: {
    product: any;
    quantity: number;
  }[]
) => {
  const product_price = cartList?.reduce((acc, items) => {
    const current_product_price = items?.product?.sale_price * items?.quantity;

    return acc + current_product_price;
  }, 0);

  return product_price;
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
  const filteredItems = cartList?.filter((item: Item) => {
    return item.product.parent_category !== "offer";
  });

  const filteredItemsTotalPrice = filteredItems.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  return filteredItemsTotalPrice >= 2500;
};

const checkIsAlreadyGiftClaimed = (cartList: Item[]) => {
  const filteredItems = cartList?.filter((item: Item) => {
    return item.product.sale_price === 0;
  });

  return filteredItems.length > 0;
};

const calculateDiscount = ({
  cartList,
  discountPercentage,
}: {
  cartList: Item[];
  discountPercentage: number;
}) => {
  const filteredItems = cartList?.filter((item: Item) => {
    return item.product.parent_category !== "offer";
  });

  const filteredItemsTotalPrice = filteredItems?.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  return Math.floor((discountPercentage / 100) * filteredItemsTotalPrice);
};

// Define a type for the slice state
export interface CartState {
  utils: {
    discountPercentage: number;
    isfreeGiftEnable: Boolean;
  };
  cartList: Item[];
  cartCost: {
    product_price: number;
    shipping_cost: number;
    discount: number;
    total_cost: number;
  };
  showCartSidebar: boolean;
  isEligibleForFreeGift: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  utils: {
    discountPercentage: 0,
    isfreeGiftEnable: false,
  },
  cartList: getLocalCartItems() || [],
  cartCost: {
    product_price: 0,
    shipping_cost: 0,
    discount: 0,
    total_cost: 0,
  },
  showCartSidebar: false,
  isEligibleForFreeGift: false,
};

// Define an async thunk
export const fetchUtils = createAsyncThunk("cartSlice/fetchUtils", async () => {
  const response = await appwriteUtilsService.getUtils();
  return response;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: () => ({
    addToCart: (state, action: PayloadAction<Item>) => {
      // Check already item exist or not
      const itemExist = checkItemExistOrNot({
        items: state.cartList,
        currentProductId: action.payload?.product?.$id,
      });

      let cartList: Item[] = [];
      if (itemExist) {
        // update quantity
        cartList = state.cartList.map((item: Item) => {
          if (item?.product?.$id === action?.payload?.product?.$id) {
            item.quantity = action.payload.quantity;
          }
          return item;
        });
      } else {
        // add new item
        cartList = [...state.cartList, action.payload];
        sendGTMEvent({ event: "AddToCart", product: action.payload.product });
      }

      // Check for Free Gift
      const isEligibleForFreeGift = checkIsEligibleForFreeGift(cartList);
      if (!isEligibleForFreeGift) {
        cartList = cartList?.filter((item: Item) => {
          return item.price !== 0;
        });
      }

      // Check Free Gift already claimed or not
      const isAlreadyGiftClaimed = checkIsAlreadyGiftClaimed(cartList);
      state.isEligibleForFreeGift =
        state.utils.isfreeGiftEnable &&
        state.utils.discountPercentage === 0 &&
        isEligibleForFreeGift &&
        !isAlreadyGiftClaimed;

      // update cartlist
      state.cartList = cartList;
      setLocalCartItems(cartList);

      // Update cartcost
      state.cartCost.product_price = calculateProductPrice(cartList);
      state.cartCost.discount = calculateDiscount({
        cartList,
        discountPercentage: state.utils.discountPercentage,
      });
      state.cartCost.total_cost =
        state.cartCost.product_price -
        state.cartCost.discount +
        state.cartCost.shipping_cost;
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      // Check already item exist or not
      const itemExist = checkItemExistOrNot({
        items: state.cartList,
        currentProductId: action?.payload?.productId,
      });

      // Remove item if exist
      if (itemExist) {
        let cartList = state?.cartList?.filter((item: Item) => {
          return item.product.$id !== action.payload.productId;
        });

        // Check for Free Gift
        const isEligibleForFreeGift = checkIsEligibleForFreeGift(cartList);
        if (!isEligibleForFreeGift) {
          cartList = cartList?.filter((item: Item) => {
            return item.price !== 0;
          });
        }

        // Check Free Gift already claimed or not
        const isAlreadyGiftClaimed = checkIsAlreadyGiftClaimed(cartList);
        state.isEligibleForFreeGift =
          state.utils.isfreeGiftEnable &&
          state.utils.discountPercentage === 0 &&
          isEligibleForFreeGift &&
          !isAlreadyGiftClaimed;

        // Update cartlist
        state.cartList = cartList;
        setLocalCartItems(cartList);
        toast(`${itemExist?.product?.name} is removed from your cart.`);

        // Update cartcost
        state.cartCost.product_price = calculateProductPrice(cartList);
        state.cartCost.discount = calculateDiscount({
          cartList,
          discountPercentage: state.utils.discountPercentage,
        });
        state.cartCost.total_cost =
          state.cartCost.product_price -
          state.cartCost.discount +
          state.cartCost.shipping_cost;
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
        state.cartCost.product_price +
        state.cartCost.shipping_cost -
        state.cartCost.discount;
    },
    setShowCartSidebar: (
      state,
      action: PayloadAction<{
        show: boolean;
      }>
    ) => {
      state.showCartSidebar = action.payload.show;
    },
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchUtils.fulfilled, (state, action) => {
      // Update discountPercentage
      state.utils.discountPercentage =
        Number(action.payload.discount_percentage) || 0;
      state.utils.isfreeGiftEnable = action.payload.free_gift_enable;

      // calculate cartcost
      const product_price = calculateProductPrice(state.cartList) || 0;
      const shipping_cost = shippingCostProvider.outside_dhaka || 0;
      const discount =
        calculateDiscount({
          cartList: state.cartList,
          discountPercentage: action.payload.discount_percentage,
        }) || 0;
      const total_cost = product_price - discount + shipping_cost;

      // Update cartcost
      state.cartCost.product_price = product_price;
      state.cartCost.shipping_cost = shipping_cost;
      state.cartCost.discount = discount;
      state.cartCost.total_cost = total_cost;
    });
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
export const selectUtils = (state: RootState) => state.cart.utils;
export const selectCartCost = (state: RootState) => state.cart.cartCost;
export const selectShowCartSidebar = (state: RootState) =>
  state.cart.showCartSidebar;
export const selectIsEligibleForFreeGift = (state: RootState) =>
  state.cart.isEligibleForFreeGift;

export default cartSlice.reducer;
