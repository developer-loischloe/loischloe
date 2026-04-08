"use client";
import "./style.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDistrict, getDivision } from "divisionbd";
import {
  shippingCostProvider,
  validateBdPhoneNumber,
  validateEmail,
} from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { sendGTMEvent } from "@next/third-parties/google";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import {
  Item,
  resetCart,
  selectCartCost,
  selectCartList,
  selectAppliedCoupon,
  selectCouponDocId,
  updateCartCost,
} from "@/redux/features/cart/cartSlice";
import appwriteCouponService from "@/appwrite/appwriteCouponService";
import PhoneInput from "react-phone-number-input";
import React, { useState } from "react";
import { Gift, Gift as GiftIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const CartSummary = dynamic(() => import("../Cart/CartSummary"), {
  ssr: false,
});

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z
    .string()
    .refine(
      (phone) => validateBdPhoneNumber(phone),
      "Enter a valid BD phone number."
    ),
  email: z
    .string()
    .refine(
      (email) => !email.length || validateEmail(email),
      "Enter a valid Email address."
    ),
  district: z.string().min(3, {
    message: "Please choose a district.",
  }),
  address: z.string().min(10, {
    message: "Enter your detailed address.",
  }),
  order_notes: z.string(),
  payment_method: z.string(),
});

export default function ShippingInformation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const cartList = useSelector(selectCartList);
  const cartCost = useSelector(selectCartCost);
  const appliedCouponCode = useSelector(selectAppliedCoupon);
  const couponDocId = useSelector(selectCouponDocId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "+880",
      email: "",
      district: "",
      address: "",
      order_notes: "",
      payment_method: "cash-on-delivery",
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const getOrderItems = (cartList: Item[]) => {
    return cartList.map((item) => {
      return {
        product: item.product.$id,
        price: item.price,
        quantity: item.quantity,
      };
    });
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const shippingInformation = {
      ...(data.name && { name: data.name }),
      ...(data.phone && { phone: data.phone }),
      ...(data.email && { email: data.email }),
      ...(data.district && { district: data.district }),
      ...(data.address && { address: data.address }),
      ...(data.order_notes && {
        order_notes: data.order_notes,
      }),
    };

    const orderItems = getOrderItems(cartList);

    if (!orderItems.length) {
      toast.warning("Please add products before proceeding to checkout.");
      setTimeout(() => {
        router.push("/products");
      }, 3000);
      return;
    }

    // Append selected shades to order notes for admin visibility
    const shadeNotes = cartList
      .filter((item: any) => item.product?.selectedShade)
      .map((item: any) => `${item.product.name}: Shade — ${item.product.selectedShade}`)
      .join("; ");
    if (shadeNotes) {
      shippingInformation.order_notes = shippingInformation.order_notes
        ? `${shippingInformation.order_notes} | ${shadeNotes}`
        : shadeNotes;
    }

    // Append coupon info to order notes
    if (appliedCouponCode) {
      const couponNote = `Coupon: ${appliedCouponCode} (৳${cartCost.coupon_discount} off)`;
      shippingInformation.order_notes = shippingInformation.order_notes
        ? `${shippingInformation.order_notes} | ${couponNote}`
        : couponNote;
    }

    const orderData = {
      shippingInformation: {
        ...shippingInformation,
        ...(isGiftWrap && { gift_wrap: true }),
        ...(isGiftWrap && giftMessage && { gift_message: giftMessage }),
      },
      orderItems,
      paymentInformation: {
        payment_method: data.payment_method,
        payment_id: "",
        payment_status: "pending",
        // paidAt: Date.now(),
        product_price: cartCost.product_price,
        shipping_cost: cartCost.shipping_cost,
        total_price: cartCost.total_cost,
        discount: cartCost.discount + cartCost.coupon_discount,
      },
    };

    try {
      const response = await appwriteOrderService.createOrder(orderData);
      // Redirect to the order-received page and clear cart
      if (response) {
        // Redeem coupon if one was applied
        if (couponDocId) {
          try {
            await appwriteCouponService.redeemCoupon(couponDocId, response.$id);
          } catch (error) {
            console.error("Error redeeming coupon:", error);
          }
        }

        // Send order notification email (fire-and-forget)
        fetch("/api/order-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...orderData,
            orderId: response.$id,
            orderItems: cartList.map((item: any) => ({
              productName: item.product?.name || "Product",
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        }).catch((err) => console.error("Email notification failed:", err));

        router.push(`/checkout/order-received/${response.$id}`);
        sendGTMEvent({
          event: "Purchase",
          cartList,
          cartCost,
          shippingInformation,
        });

        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  // Update cartcost based on District
  const district = form.watch("district");
  useEffect(() => {
    if (district === "Dhaka") {
      dispatch(
        updateCartCost({ shipping_cost: shippingCostProvider.inside_dhaka })
      );
    } else {
      dispatch(
        updateCartCost({ shipping_cost: shippingCostProvider.outside_dhaka })
      );
    }
  }, [district, dispatch]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl mb-5">Shipping Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      className="phone_number"
                      international
                      defaultCountry="BD"
                      initialValueFormat="national"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email(optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {getDivision().map((division) => (
                        <SelectGroup key={division.name}>
                          <SelectLabel className="text-lg">
                            {division.name}
                          </SelectLabel>
                          {getDistrict(division.name).map((district) => (
                            <SelectItem
                              key={district.name}
                              value={district.name}
                            >
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your detailed address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gift Wrap Option */}
          <div className="border border-brand_primary/30 rounded-xl p-4 bg-[#fdf8f3] space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="gift-wrap"
                checked={isGiftWrap}
                onCheckedChange={(v) => setIsGiftWrap(!!v)}
                className="border-brand_primary data-[state=checked]:bg-brand_secondary"
              />
              <label
                htmlFor="gift-wrap"
                className="flex items-center gap-2 cursor-pointer font-medium text-brand_secondary"
              >
                <GiftIcon size={16} className="text-brand_primary" />
                Add Gift Wrapping — FREE
              </label>
            </div>
            {isGiftWrap && (
              <div className="space-y-2 pl-7">
                <p className="text-xs text-brand_gray">
                  Your order will be beautifully wrapped in our signature Lois Chloe packaging.
                </p>
                <Textarea
                  placeholder="Add a personal gift message (optional)"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  rows={3}
                  maxLength={200}
                  className="text-sm resize-none"
                />
                <p className="text-xs text-brand_gray text-right">
                  {giftMessage.length}/200
                </p>
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="order_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Notes(optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row justify-between gap-10">
            <CartSummary />

            {/* Payment Method */}
            <div className="flex-1 space-y-5">
              <div>
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Choose Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cash-on-delivery" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Cash on delivery
                            </FormLabel>
                          </FormItem>

                          {/* <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="bkash" />
                            </FormControl>
                            <FormLabel className="font-normal">Bkash</FormLabel>
                          </FormItem>  */}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={!isDirty || isSubmitting}>
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
