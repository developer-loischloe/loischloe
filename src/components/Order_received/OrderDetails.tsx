import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const OrderDetails = ({ order }: { order: any }) => {
  return (
    <div>
      <h4 className="text-xl font-medium text-brand_secondary">
        Order details
      </h4>

      {order?.orderItems?.length && (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex-1">Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.orderItems?.map((item: any) => (
                <TableRow key={item.$id}>
                  <TableCell className="text-base">
                    <Link
                      href={`/products/${item?.product?.slug}`}
                      className="hover:underline"
                    >
                      {item?.product?.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {item?.quantity}
                  </TableCell>
                  <TableCell className="text-right text-base">
                    {formatCurrency(item?.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <hr />
      <div>
        <Table>
          <TableBody>
            <TableRow className="flex justify-between border-none text-base">
              <TableCell className="font-medium">Product price:</TableCell>
              <TableCell>
                {formatCurrency(order?.paymentInformation?.product_price)}
              </TableCell>
            </TableRow>

            <TableRow className="flex justify-between  border-none text-base">
              <TableCell className="font-medium">Shipping cost:</TableCell>
              <TableCell>
                {formatCurrency(order?.paymentInformation?.shipping_cost)}
              </TableCell>
            </TableRow>

            {order?.paymentInformation?.discount > 0 && (
              <TableRow className="flex justify-between  border-none text-base">
                <TableCell className="font-medium">Discount:</TableCell>
                <TableCell className="text-red-500">
                  - {formatCurrency(order?.paymentInformation?.discount)}
                </TableCell>
              </TableRow>
            )}

            <TableRow className="flex justify-between  border-none text-base">
              <TableCell className="font-medium">Payment method: </TableCell>
              <TableCell>{order?.paymentInformation?.payment_method}</TableCell>
            </TableRow>

            <TableRow className="flex justify-between  border-none text-base">
              <TableCell className="font-medium">Total:</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(order?.paymentInformation?.total_price)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderDetails;
