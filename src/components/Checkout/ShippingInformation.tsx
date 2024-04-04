"use client";

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
import { shippingCostProvider, validateEmail } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import dynamic from "next/dynamic";

import PaymentInformation from "./PaymentInformation";
import { useDispatch, useSelector } from "react-redux";
import {
  Item,
  selectCartCost,
  selectCartList,
  updateCartCost,
} from "@/redux/features/cart/cartSlice";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { useRouter } from "next/navigation";
const CartSummary = dynamic(() => import("../Cart/CartSummary"), {
  ssr: false,
});

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone number must be at least 11 characters.",
  }),
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
});

export default function ShippingInformation() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartList = useSelector(selectCartList);
  const cartCost = useSelector(selectCartCost);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      district: "",
      address: "",
      order_notes: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const getOrderItems = (cartList: Item[]) => {
    return cartList.map((item) => {
      return {
        ...item,
        product: item.product.$id,
      };
    });
  };

  async function onSubmit(shippingInfo: z.infer<typeof formSchema>) {
    const orderInfo = {
      shippingInformation: shippingInfo,
      orderItems: getOrderItems(cartList),
      paymentInformation: {
        payment_method: "cash-on-delivery",
        payment_id: "",
        payment_status: "pending",
        // paidAt: Date.now(),
        product_price: cartCost.product_price,
        shipping_cost: cartCost.shipping_cost,
        total_price: cartCost.total_cost,
      },
    };

    const response = await appwriteOrderService.createOrder(orderInfo);
    console.log({ OrderResponse: response });
    if (response) {
      router.push(`/checkout/order-received/${response.$id}`);
    }
  }

  const values = form.watch("district");
  if (values === "Dhaka") {
    dispatch(
      updateCartCost({ shipping_cost: shippingCostProvider.inside_dhaka })
    );
  } else {
    dispatch(
      updateCartCost({ shipping_cost: shippingCostProvider.outside_dhaka })
    );
  }

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
                    <Input placeholder="Enter your phone number" {...field} />
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
                  <Select onValueChange={field.onChange}>
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
            <PaymentInformation disabled={!isDirty || isSubmitting} />
          </div>
        </form>
      </Form>
    </div>
  );
}
