import React from "react";

const OrderPaymentMethod = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="mb-5">
        <h5 className="font-bold">Payment Information</h5>
      </div>

      <ul className="space-y-2">
        <li>
          <span className="text-brand_gray">Payment method: </span>
          <span>{order?.paymentInformation?.payment_method}</span>
        </li>
        <li>
          <span className="text-brand_gray">Payment status: </span>
          <span>{order?.paymentInformation?.payment_status}</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderPaymentMethod;
