"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, PencilLine, Trash2, X } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { format as dateFormat } from "date-fns";
import DeleteProduct from "./DeleteProduct";

const ProductItem = ({ product }: { product: any }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="w-[100px] flex gap-2 items-center">
          <Image
            src={product?.images?.[0].image_url}
            alt={product?.images?.[0].alt}
            width={100}
            height={100}
            priority
            className="w-auto h-auto"
          />
          <h5 className="line-clamp-3">{product?.name} </h5>
        </div>
      </TableCell>
      <TableCell>{product.$id}</TableCell>
      <TableCell className="text-center">
        {formatCurrency(product?.price)}
      </TableCell>
      <TableCell className="text-center">
        {formatCurrency(product?.sale_price)}
      </TableCell>
      <TableCell className={cn()}>{product?.product_quantity}</TableCell>
      <TableCell
        className={cn("", {
          "text-green-400": product?.stock === "in-stock",
          "text-red-400": product?.stock === "out-of-stock",
        })}
      >
        {product?.stock.split("-").join(" ")}
      </TableCell>

      <TableCell>
        <div>
          <time className="text-brand_primary">
            {dateFormat(product?.$createdAt, "MM-dd-yyyy")}
          </time>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-5 h-full">
          <Link href={`/products/${product?.slug}`}>
            <Eye size={20} className="text-blue-500 cursor-pointer" />
          </Link>
          <Link href={`/dashboard/products/edit/${product?.slug}`}>
            <PencilLine size={20} className="text-green-500 cursor-pointer" />
          </Link>

          <DeleteProduct productId={product?.$id}>
            <Trash2 size={20} className="text-red-500 cursor-pointer" />
          </DeleteProduct>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
