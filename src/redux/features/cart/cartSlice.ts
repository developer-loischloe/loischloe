import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sendGTMEvent } from "@next/third-parties/google";
import { shippingCostProvider } from "@/lib/utils";
import { toast } from "sonner";
import appwriteUtilsService from "@/appwrite/appwriteUtilsService";
import appwriteCouponService from "@/appwrite/appwriteCouponService";

// Types
export interface Item {
  product: any;
  price: number;
  quantity: number;
}

// Utility function
export const getLocalCartItems = (): Item[] => {
  let localCartItems = "[]";
  if (typeof window !== "undefined") {
    localCartItems = sessionStorage.getItem("cart") || "[]";
  }

  try {
    const parsed = JSON.parse(localCartItems);
    if (!Array.isArray(parsed)) return [];
    // Drop any item whose product reference is missing or has no $id.
    // Stale sessionStorage entries referencing deleted Appwrite docs otherwise
    // crash the checkout with "Cannot read properties of undefined".
    return parsed.filter(
      (it: any) =>
        it &&
        typeof it === "object" &&
        it.product &&
        typeof it.product.$id === "string" &&
        typeof it.price === "number" &&
        typeof it.quantity === "number"
    );
  } catch {
    return [];
  }
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
    const price = Number(items?.product?.price) || 0;
    const qty = Number(items?.quantity) || 0;
    return acc + price * qty;
  }, 0);

  return product_price || 0;
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
  const filteredItems = (cartList || []).filter((item: Item) => {
    return item?.product?.parent_category !== "offer";
  });

  const filteredItemsTotalPrice = filteredItems.reduce((acc, curr) => {
    return acc + (Number(curr?.quantity) || 0) * (Number(curr?.price) || 0);
  }, 0);

  return filteredItemsTotalPrice >= 2500;
};

const checkIsAlreadyGiftClaimed = (cartList: Item[]) => {
  const filteredItems = (cartList || []).filter((item: Item) => {
    return Number(item?.product?.sale_price) === 0;
  });

  return filteredItems.length > 0;
};

const calculateDiscount = ({
  cartList,
}: {
  cartList: Item[];
}) => {
  const { total_price, sale_price } = (cartList || []).reduce(
    (acc, curr) => {
      const qty = Number(curr?.quantity) || 0;
      const price = Number(curr?.product?.price) || 0;
      // If sale_price is missing, fall back to price so discount is 0
      // (prevents NaN propagating into total_cost and breaking checkout).
      const sp =
        curr?.product?.sale_price == null
          ? price
          : Number(curr.product.sale_price) || 0;
      return {
        total_price: acc.total_price + qty * price,
        sale_price: acc.sale_price + qty * sp,
      };
    },
    { total_price: 0, sale_price: 0 }
  );

  const discount = total_price - sale_price;
  return discount > 0 ? discount : 0;
};

// Define a type for the slice state
export interface CartState {
  utils: {
    discountPercentage: number;
    isfreeGiftEnable: Boolean;
    freeGiftProductIds: string[];
  };
  cartList: Item[];
  cartCost: {
    product_price: number;
    shipping_cost: number;
    discount: number;
    coupon_discount: number;
    total_cost: number;
  };
  appliedCoupon: string | null;
  couponDocId: string | null;
  couponLoading: boolean;
  showCartSidebar: boolean;
  isEligibleForFreeGift: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  utils: {
    discountPercentage: 0,
    isfreeGiftEnable: false,
    freeGiftProductIds: [],
  },
  cartList: getLocalCartItems() || [],
  cartCost: {
    product_price: 0,
    shipping_cost: 0,
    discount: 0,
    coupon_discount: 0,
    total_cost: 0,
  },
  appliedCoupon: null,
  couponDocId: null,
  couponLoading: false,
  showCartSidebar: false,
  isEligibleForFreeGift: false,
};

// Define an async thunk
export const fetchUtils = createAsyncThunk("cartSlice/fetchUtils", async () => {
  const response = await appwriteUtilsService.getUtils();
  return response;
});

// Validate coupon code against Appwrite
export const validateCoupon = createAsyncThunk(
  "cartSlice/validateCoupon",
  async (code: string, { rejectWithValue }) => {
    const coupon = await appwriteCouponService.validateCoupon(code.toUpperCase().trim());
    if (!coupon) {
      return rejectWithValue("Invalid or already used coupon code");
    }
    return { code: coupon.code, discount: coupon.discount, docId: coupon.$id };
  }
);

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
      });
      state.cartCost.total_cost =
        state.cartCost.product_price -
        state.cartCost.discount -
        state.cartCost.coupon_discount +
        state.cartCost.shipping_cost;
      if (state.cartCost.total_cost < 0) state.cartCost.total_cost = 0;
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
        });
        state.cartCost.total_cost =
          state.cartCost.product_price -
          state.cartCost.discount -
          state.cartCost.coupon_discount +
          state.cartCost.shipping_cost;
        if (state.cartCost.total_cost < 0) state.cartCost.total_cost = 0;
      }
    },
    resetCart: (state) => {
      state.cartList = [];
      state.appliedCoupon = null;
      state.couponDocId = null;
      state.cartCost.coupon_discount = 0;
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
        state.cartCost.discount -
        state.cartCost.coupon_discount;
      if (state.cartCost.total_cost < 0) state.cartCost.total_cost = 0;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.cartCost.coupon_discount = 0;
      state.cartCost.total_cost =
        state.cartCost.product_price -
        state.cartCost.discount +
        state.cartCost.shipping_cost;
      toast("Coupon removed");
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
    // Coupon validation
    builder.addCase(validateCoupon.pending, (state) => {
      state.couponLoading = true;
    });
    builder.addCase(validateCoupon.fulfilled, (state, action) => {
      state.couponLoading = false;
      state.appliedCoupon = action.payload.code;
      state.couponDocId = action.payload.docId;
      state.cartCost.coupon_discount = action.payload.discount;
      state.cartCost.total_cost =
        state.cartCost.product_price -
        state.cartCost.discount -
        state.cartCost.coupon_discount +
        state.cartCost.shipping_cost;
      if (state.cartCost.total_cost < 0) state.cartCost.total_cost = 0;
      toast.success(`Coupon applied! ৳${action.payload.discount} off`);
    });
    builder.addCase(validateCoupon.rejected, (state, action) => {
      state.couponLoading = false;
      state.appliedCoupon = null;
      state.couponDocId = null;
      state.cartCost.coupon_discount = 0;
      toast.error((action.payload as string) || "Invalid coupon code");
    });

    builder.addCase(fetchUtils.fulfilled, (state, action) => {
      // Update utils
      state.utils.discountPercentage =
        Number(action.payload.discount_percentage) || 0;
      state.utils.isfreeGiftEnable = action.payload.free_gift_enable || false;
      state.utils.freeGiftProductIds =
        action.payload?.free_gift_product_ids || [];

      // calculate cartcost
      const product_price = calculateProductPrice(state.cartList) || 0;
      const shipping_cost = shippingCostProvider.outside_dhaka || 0;
      const discount =
        calculateDiscount({
          cartList: state.cartList,
        }) || 0;


      const coupon_discount = state.cartCost.coupon_discount || 0;
      const total_cost = Math.max(0, product_price - discount - coupon_discount + shipping_cost);

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
  removeCoupon,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartList = (state: RootState) => state.cart.cartList;
export const selectUtils = (state: RootState) => state.cart.utils;
export const selectCartCost = (state: RootState) => state.cart.cartCost;
export const selectShowCartSidebar = (state: RootState) =>
  state.cart.showCartSidebar;
export const selectIsEligibleForFreeGift = (state: RootState) =>
  state.cart.isEligibleForFreeGift;
export const selectAppliedCoupon = (state: RootState) =>
  state.cart.appliedCoupon;
export const selectCouponLoading = (state: RootState) =>
  state.cart.couponLoading;
export const selectCouponDocId = (state: RootState) =>
  state.cart.couponDocId;

export default cartSlice.reducer;
