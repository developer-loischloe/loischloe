"use client";
import "./style.css";

import { useRouter } from "next/navigation";
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
  cn,
  shippingCostProvider,
  validateBdPhoneNumber,
  validateEmail,
} from "@/lib/utils";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { toast } from "sonner";
import { Item } from "@/redux/features/cart/cartSlice";
import PhoneInput from "react-phone-number-input";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CommandItem } from "cmdk";
import appwriteProductService from "@/appwrite/appwriteProductService";

// const CartSummary = dynamic(() => import("../Cart/CartSummary"), {
//   ssr: false,
// });

const formSchema = z.object({
  orderItems: z
    .object({
      price: z.number(),
      quantity: z.number(),
      product: z.string(),
    })
    .array(),
  shippingInformation: z.object({
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
  }),
  paymentInformation: z.object({
    payment_method: z.string(),
  }),
});

export default function AddManualOrder() {
  const [products, setProducts] = useState<any[]>([]);

  const router = useRouter();

  // Fetch all products
  useEffect(() => {
    appwriteProductService
      .getAllProductIdAndNameAndPrice()
      .then((response) => {
        setProducts(response?.documents);
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch products.");
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderItems: [
        {
          price: 0,
          quantity: 1,
          product: "",
        },
      ],
      shippingInformation: {
        name: "",
        phone: "+880",
        email: "",
        district: "",
        address: "",
        order_notes: "",
      },
      paymentInformation: {
        payment_method: "cash-on-delivery",
      },
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const shippingInformation = {
      ...(data.shippingInformation.name && {
        name: data.shippingInformation.name,
      }),
      ...(data.shippingInformation.phone && {
        phone: data.shippingInformation.phone,
      }),
      ...(data.shippingInformation.email && {
        email: data.shippingInformation.email,
      }),
      ...(data.shippingInformation.district && {
        district: data.shippingInformation.district,
      }),
      ...(data.shippingInformation.address && {
        address: data.shippingInformation.address,
      }),
      ...(data.shippingInformation.order_notes && {
        order_notes: data.shippingInformation.order_notes,
      }),
    };

    // const orderItems = getOrderItems(cartList);

    // if (!orderItems.length) {
    //   toast.warning("Please add products before proceeding to checkout.");
    //   setTimeout(() => {
    //     router.push("/products");
    //   }, 3000);
    //   return;
    // }

    const orderData = {
      shippingInformation,
      //   orderItems,
      paymentInformation: {
        payment_method: data.paymentInformation.payment_method,
        payment_id: "",
        payment_status: "pending",
        // paidAt: Date.now(),
        // product_price: cartCost.product_price,
        // shipping_cost: cartCost.shipping_cost,
        // total_price: cartCost.total_cost,
        // discount: cartCost.discount,
      },
    };

    try {
      const response = await appwriteOrderService.createOrder(orderData);
      // Redirect to the order-received page and clear cart
      if (response) {
        router.push(`/checkout/order-received/${response.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Update cartcost based on District
  const district = form.watch("shippingInformation.district");
  if (district === "Dhaka") {
    // dispatch(
    //   updateCartCost({ shipping_cost: shippingCostProvider.inside_dhaka })
    // );
  } else {
    // dispatch(
    //   updateCartCost({ shipping_cost: shippingCostProvider.outside_dhaka })
    // );
  }

  console.log(form.watch());

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {/* Select Product */}
          <div className="bg-white p-5 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-xl md:text-2xl mb-5">Products</h1>

              <Button
                type="button"
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  const items = form.watch("orderItems") || [];
                  items.push({
                    price: 0,
                    quantity: 1,
                    product: "",
                  });
                  form.setValue("orderItems", items);
                }}
              >
                Add
              </Button>
            </div>

            {/* {div} */}
            <div>
              {form.watch("orderItems").map((item, itemIndex) => {
                const existingProduct = form
                  .watch("orderItems")
                  .flatMap((item) => item.product);

                const filteredProduct = products.filter(
                  (product) => !existingProduct.includes(product.$id)
                );

                const currentField = filteredProduct.find((product) => {
                  const fieldItemProductId = form
                    .watch("orderItems")
                    .find(
                      (item, fieldIndex) => itemIndex === fieldIndex
                    )?.product;

                  return product?.$id === fieldItemProductId;
                });

                console.log({ existingProduct, filteredProduct, currentField });

                return (
                  <div key={itemIndex} className="flex gap-5">
                    <FormField
                      control={form.control}
                      name="orderItems"
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Product</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value.length
                                        ? filteredProduct.find((product) => {
                                            const fieldItemProductId =
                                              field.value.find(
                                                (item, fieldIndex) =>
                                                  itemIndex === fieldIndex
                                              )?.product;

                                            return (
                                              product?.$id ===
                                              fieldItemProductId
                                            );
                                          })?.name
                                        : "Select a product"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                  <Command>
                                    <CommandInput placeholder="Search product..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No product found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {products?.map((product, index) => (
                                          <CommandItem
                                            key={product?.$id}
                                            value={product?.name}
                                            //   className={cn(
                                            //     existingProduct?.includes(product?.$id) &&
                                            //       "!text-red-500"
                                            //   )}
                                            onSelect={() => {
                                              const items = form
                                                .watch("orderItems")
                                                .map((item, i) => {
                                                  if (itemIndex === i) {
                                                    item.product = product?.$id;
                                                    item.price =
                                                      product?.sale_price;
                                                    item.quantity = 2;
                                                  }
                                                  return item;
                                                });

                                              form.setValue(
                                                "orderItems",
                                                items
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                product?.$id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            <span>
                                              {index + 1} {" : "}{" "}
                                              {product?.name}
                                            </span>
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>

                              <FormMessage />
                            </FormItem>
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  value={item.price}
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    // onChange(Number(value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    // onChange(Number(value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div>
            {form.watch("orderItems").map((item) => (
            ))}
          </div> */}
          {/* Shipping Information */}
          <div className="bg-white p-5 rounded-md">
            <h1 className="text-xl md:text-2xl mb-5">Shipping Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="shippingInformation.name"
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
                name="shippingInformation.phone"
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
                name="shippingInformation.email"
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
                name="shippingInformation.district"
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
                name="shippingInformation.address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your detailed address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shippingInformation.order_notes"
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
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* <CartSummary /> */}

            {/* Payment Method */}
            <div className="flex-1 space-y-5">
              <div>
                <FormField
                  control={form.control}
                  name="paymentInformation.payment_method"
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
