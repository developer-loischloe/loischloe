import React from "react";

const OrderShippingAddress = ({ order }: { order: any }) => {
  const { name, email, phone, district, address, order_notes } =
    order.shippingInformation;

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="mb-5">
        <h5 className="font-bold">Shipping Information</h5>
      </div>

      <ul className="space-y-2">
        <li>
          <span className="text-brand_gray">Name: </span>
          <span>{name}</span>
        </li>
        <li>
          <span className="text-brand_gray">Phone: </span>
          <span>{phone}</span>
        </li>
        <li>
          <span className="text-brand_gray">Email: </span>
          <span>{email}</span>
        </li>
        <li>
          <span className="text-brand_gray">District: </span>
          <span>{district}</span>
        </li>
        <li>
          <span className="text-brand_gray">Address: </span>
          <span>{address}</span>
        </li>

        <li>
          <span className="text-brand_gray">Order notes: </span>
          <span>{order_notes}</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderShippingAddress;
