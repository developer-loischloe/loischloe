import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OfferProps {
  title: string;
  btnLink: string;
  bgImage: any;
  btnClassName?: string;
}

const OfferCard = ({ offer }: { offer: OfferProps }) => {
  return (
    <div className="relative flex-1 overflow-hidden  rounded-sm">
      <Link href={offer.btnLink}>
        <Image src={offer.bgImage} alt={offer.title} className="" />
      </Link>
    </div>
  );
};

export default OfferCard;
