"use client";
import ReactHotspots from "react-hotspots";
import "react-hotspots/dist/style.css";
import GrowUpDown from "./GrowUpDown";
import { formatCurrency } from "@/lib/utils";
const ImageContainer = ({
  products,
  hoveredProduct,
  setHoveredProduct,
}: {
  products: any[];
  hoveredProduct: string;
  setHoveredProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ReactHotspots
      image="/mustHaveEssentials/lipsticks.png"
      imageAlt="React Logo"
      className="cstm-container"
      iconSize="30px"
      iconColor="#ffffff"
      hotspots={products?.map((product) => {
        const position = {
          top: 0,
          left: 0,
        };
        if (product?.$id === "660906177ffa1cc98562") {
          position.top = 45;
          position.left = 50;
        } else if (product?.$id === "66110b62534c53ca959f") {
          position.top = 55;
          position.left = 24;
        } else if (product?.$id === "66090035745143268a80") {
          position.top = 35;
          position.left = 69;
        }
        return {
          top: `${position.top}%`,
          left: `${position.left}%`,
          triggerIcon: (
            <div
              className="max-w-max"
              onMouseEnter={() => {
                setHoveredProduct(product?.$id);
              }}
              onMouseLeave={() => {
                setHoveredProduct("");
              }}
            >
              <GrowUpDown />
            </div>
          ),
          className: "",
          content: (
            <div className="w-full max-w-[150px] rounded-md">
              <h4>{product?.name}</h4>
              <p className="text-brand_primary">
                {formatCurrency(product?.sale_price)}
              </p>
            </div>
          ),
        };
      })}
    />
  );
};

export default ImageContainer;
