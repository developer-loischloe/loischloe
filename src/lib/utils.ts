import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import currencyFormatter from "currency-formatter";
import { format, toZonedTime } from "date-fns-tz";

// =>>
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =>>>>>>>>>>>>>>>>>>>
export const formatCurrency = (price: number) => {
  return currencyFormatter.format(price, { code: "BDT" });
};

export const formatMoney = (amount: number) => {
  if (amount < 1000) {
    return amount.toString();
  }

  // Convert the amount to a string in the format of x.xxxk
  let formattedAmount = (amount / 1000).toFixed(3);

  // Remove trailing zeroes if necessary
  formattedAmount = formattedAmount.replace(/\.?0+$/, "");

  return `${formattedAmount}k`;
};

export const calculateChange = (
  previousValue: number,
  currentValue: number
) => {
  let change = currentValue - previousValue;
  let changeType = change > 0 ? "increment" : "decrement";
  let changeValue = Math.abs(change);
  let percentageChange = ((changeValue / previousValue) * 100).toFixed(2);

  return { changeType, changeValue, percentageChange };
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

export const validateBdPhoneNumber = (phone: string) => {
  const phoneRegex = /^\+8801[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};

export const validateURL = (url: string) => {
  const urlRegex =
    /^(https?:\/\/)((([a-zA-Z0-9_\-]+)(\.[a-zA-Z0-9_\-]+)+)|localhost)(:\d+)?(\/[a-zA-Z0-9_\-.,:@&%=?\/~+#]*)?$/;
  return urlRegex.test(url);
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

export const calculateDiscountPercentage = (
  regularPrice: number,
  offerPrice: number
) => {
  const priceDifference = regularPrice - offerPrice;
  const discountPercentage = (priceDifference / regularPrice) * 100;
  return Math.ceil(discountPercentage);
};

export const shippingCostProvider = {
  inside_dhaka: 60,
  outside_dhaka: 100,
};

export const getBdtime = (date: any) => {
  const bdDate = toZonedTime(date, "Asia/Dhaka");
  return format(bdDate, "h:mm a", { timeZone: "Asia/Dhaka" });
};

export const getBdDate = (date: any) => {
  const bdDate = toZonedTime(date, "Asia/Dhaka");
  return format(bdDate, "MM-dd-yyyy", { timeZone: "Asia/Dhaka" });
};

// file transformation
export const getFileToUrl = (file: File) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target?.result);
    };

    reader.readAsDataURL(file);
  });
};

// Function to remove HTML tags from a string
export const removeHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};
