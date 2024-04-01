import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuantityUpdater from "../Products/Product/CartHandler/QuantityUpdater";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/features/cart/cartSlice";

const CartItem = ({
  product,
  quantity: prevQuantity,
}: {
  product: any;
  quantity: number;
}) => {
  const [quantity, setQuantity] = useState(prevQuantity);

  const dispatch = useDispatch();

  return (
    <div
      key={product.$id}
      className="flex flex-col md:flex-row md:items-center gap-8 border p-5 overflow-hidden rounded-sm"
    >
      <Image
        src={product?.images[0]?.image_url}
        alt={product?.name}
        width={100}
        height={100}
        className="w-full h-full max-w-[100px] max-h-[100px]"
      />
      <div className="flex-1 flex flex-col lg:flex-row lg:justify-between gap-5">
        <div>
          <h5 className="text-lg">{product.name}</h5>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <ins className="no-underline text-brand_gray">
                    <span className="">
                      {formatCurrency(product?.sale_price)}
                    </span>
                  </ins>
                </TableCell>
                <TableCell>
                  <QuantityUpdater
                    quantity={quantity}
                    setQuantity={setQuantity}
                    product={product}
                  />
                </TableCell>
                <TableCell>
                  <ins className="no-underline text-brand_gray">
                    <span className="">
                      {formatCurrency(product?.sale_price * quantity)}
                    </span>
                  </ins>
                </TableCell>
                <TableCell className="text-right">
                  <Trash2
                    size={18}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromCart({ productId: product.$id }));
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
