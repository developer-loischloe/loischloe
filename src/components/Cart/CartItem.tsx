import { formatCurrency } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { useDispatch } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuantityUpdater from "../Products/Product/CartHandler/QuantityUpdater";
import { removeFromCart } from "@/redux/features/cart/cartSlice";

const CartItem = ({
  product,
  quantity: prevQuantity,
}: {
  product: any;
  quantity: number;
}) => {
  const dispatch = useDispatch();

  return (
    <div
      key={product.$id}
      className="flex flex-col md:flex-row md:items-center gap-8 border overflow-hidden rounded-sm"
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
          <h5 className="text-lg px-4">{product.name}</h5>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="">Total</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium ">
                  <ins className="no-underline text-brand_gray">
                    <span className="">
                      {formatCurrency(product?.sale_price)}
                    </span>
                  </ins>
                </TableCell>
                <TableCell className="">
                  <QuantityUpdater quantity={prevQuantity} product={product} />
                </TableCell>
                <TableCell className="">
                  <ins className="no-underline text-brand_gray">
                    <span className="">
                      {formatCurrency(product?.sale_price * prevQuantity)}
                    </span>
                  </ins>
                </TableCell>
                <TableCell className="">
                  <div className="w-full flex items-center justify-center">
                    <Trash2
                      size={18}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(removeFromCart({ productId: product.$id }));
                      }}
                    />
                  </div>
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
