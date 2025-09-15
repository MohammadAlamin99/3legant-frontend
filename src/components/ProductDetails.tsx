import { Star } from "lucide-react";
import QtyAndATC from "./ProductDetails/QtyAndATC";
import ColorVarient from "./ProductDetails/ColorVarient";
import ThumsSlider from "./ProductDetails/ThumsSlider";
import { Product } from "@/types/product.type";

interface ProductDetailsProps {
  product: Product;
}
export default function ProdcutDetails({ product }: ProductDetailsProps) {
  return (
    <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 md:gap-10 gap-4">
        <div className="space-y-6">
          <ThumsSlider product={product}/>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
               {Array.from({ length: Math.floor(product?.rating?.average || 0) }).map(
              (_, index) => (
                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
              )
            )}
            {Array.from({
              length: 5 - Math.floor(product?.rating?.average || 0),
            }).map((_, index) => (
              <Star width={16} height={16} key={index} className="text-[#6C7275] fill-[#6C7275]" />
            ))}
            <span className="ml-1.5 font-inter text-sm font-medium">({product?.rating?.average})</span>
            </div>
            <span className="text-[#141718] text-[12px] font-inter font-normal">
              11 Reviews
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[40px] font-medium font-poppins">
            {product?.title}
          </h1>

          {/* Description */}
          <p className="text-[#6C7275] text-[16px] font-normal font-inter leading-relaxed">
            {product?.description}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-[28px] font-medium text-[#121212] font-poppins">
              TK. {product?.basePrice}
            </span>
            <span className="text-[20px] font-poppins text-[#6C7275] line-through">
              TK. {product?.compareAtPrice}
            </span>
          </div>

          {/* Measurements */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#6C7275] mb-2">
              Measurements
            </h3>
            <p className="text-black font-normal font-inter text-[20px]">
              17 1/2×20 5/8
            </p>
          </div>

          {/* Color Selection */}
          <ColorVarient />

          {/* Quantity and Actions */}
          <QtyAndATC />

          {/* Product Info */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex gap-[98px]">
              <span className="text-[#6C7275] font-normal font-inter text[12px] w-20">
                SKU
              </span>
              <span className="text-[#141718] font-inter text[12px]">1117</span>
            </div>
            <div className="flex gap-[98px]">
              <span className="text-[#6C7275] font-normal font-inter text[12px] w-20">
                CATEGORY
              </span>
              <span className="text-[#141718] font-inter text[12px]">
                Living Room, Bedroom
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
