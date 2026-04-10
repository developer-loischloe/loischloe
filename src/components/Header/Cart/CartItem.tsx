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
import QuantityUpdater from "@/components/Products/Product/CartHandler/QuantityUpdater";
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
    <div key={product.$id} className="flex border overflow-hidden rounded-sm">
      <Image
        src={product?.images[0]?.image_url}
        alt={product?.name}
        width={100}
        height={100}
        loading="lazy"
        sizes="80px"
        className="w-full h-full max-w-[80px] max-h-[80px]"
      />

      <div className="flex-1 ">
        <h5 className="text-lg px-4 line-clamp-1">{product.name}</h5>
        {product?.selectedShade && (
          <p className="text-xs text-[#636e72] px-4">Shade: {product.selectedShade}</p>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Price</TableHead>
              {product?.price > 0 && (
                <TableHead className="text-center">Quantity</TableHead>
              )}
              <TableHead className="hidden sm:flex items-center">
                Total
              </TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium ">
                <ins className="no-underline text-brand_gray">
                  <span className="">{formatCurrency(product?.price)}</span>
                </ins>
              </TableCell>
              {product?.price > 0 && (
                <TableCell className="">
                  <QuantityUpdater quantity={prevQuantity} product={product} />
                </TableCell>
              )}

              <TableCell className="hidden sm:flex items-center mt-2">
                <ins className="no-underline text-brand_gray">
                  <span className="">
                    {formatCurrency(product?.price * prevQuantity)}
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
  );
};

export default CartItem;
