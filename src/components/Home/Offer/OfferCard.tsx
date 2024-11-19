import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OfferProps {
  title: string;
  btnLink: string;
  bgImage: any;
  btnClassName?: string;
}

const OfferCard = ({ offer }: { offer: OfferProps }) => {
  return (
    <div className="relative flex-1 overflow-hidden rounded-md hover:scale-105 transition-all duration-300">
      <Link href={offer.btnLink}>
        <Image src={offer.bgImage} alt={offer.title} />
      </Link>
    </div>
  );
};

export default OfferCard;
