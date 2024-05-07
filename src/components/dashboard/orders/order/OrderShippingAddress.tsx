import React from "react";

const OrderShippingAddress = ({ order }: { order: any }) => {
  const { name, email, phone, district, address, order_notes } =
    order.shippingInformation;

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="mb-2">
        <h5 className="font-bold">ShippingInformation</h5>
      </div>

      <ul className="text-brand_gray">
        <li>
          <span>Name: </span>
          <span>{name}</span>
        </li>
        <li>
          <span>Phone: </span>
          <span>{phone}</span>
        </li>
        <li>
          <span>Email: </span>
          <span>{email}</span>
        </li>
        <li>
          <span>District: </span>
          <span>{district}</span>
        </li>
        <li>
          <span>Address: </span>
          <span>{address}</span>
        </li>

        <li>
          <span>Order notes: </span>
          <span>{order_notes}</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderShippingAddress;
