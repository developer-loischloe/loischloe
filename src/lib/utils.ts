import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import currencyFormatter from "currency-formatter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (price: number) => {
  return currencyFormatter.format(price, { code: "BDT" });
};
export const formatCategory = (category: string) => {
  return category.split(" ").join("-");
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const generateParams = (params: any) => {
  const urlSearchParams = new URLSearchParams();

  for (const param in params) {
    if (params[param]) {
      urlSearchParams.set(param, params[param]);
    }
  }

  return urlSearchParams.toString();
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

export const shippingCostProvider = {
  inside_dhaka: 60,
  outside_dhaka: 100,
};
