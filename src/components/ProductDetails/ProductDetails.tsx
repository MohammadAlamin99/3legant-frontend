import { Star } from "lucide-react";
import ColorVarients from "./ColorVarients";
import ThumsSlider from "./ThumsSlider";
import { Product } from "@/types/product.type";
import { IProductVariant } from "@/types/variant.type";
import AccordionTabs from "./AccordionTabs";

interface ProductDetailsProps {
  product: Product;
}
export default function ProdcutDetails({ product }: ProductDetailsProps) {
  console.log(product?.attributes);
  return (
    <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 md:gap-10 gap-4">
        <div className="space-y-6">
          <ThumsSlider product={product} />
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({
                length: Math.floor(product?.rating?.average || 0),
              }).map((_, index) => (
                <Star
                  width={16}
                  height={16}
                  key={index}
                  className="text-[#343839] fill-[#343839]"
                />
              ))}
              {Array.from({
                length: 5 - Math.floor(product?.rating?.average || 0),
              }).map((_, index) => (
                <Star
                  width={16}
                  height={16}
                  key={index}
                  className="text-[#6C7275] fill-[#6C7275]"
                />
              ))}
              <span className="ml-1.5 font-inter text-sm font-medium">
                ({product?.rating?.average})
              </span>
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

          {/* varients Selection */}
          <ColorVarients
            variants={
              product?.variants
                ? (product.variants as unknown as IProductVariant[])
                : []
            }
            dimensions={product?.dimensions}
            productId={product?._id}
          />

          {/* Product Info */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            {product?.attributes ? (
              <div>
                {Object.entries(product?.attributes).map(
                  ([key, value], index) => (
                    <div key={index} className="flex gap-[98px]">
                      <span className="text-[#6C7275] font-normal font-inter text-[12px] w-20">
                        {key.toUpperCase()}
                      </span>
                      <span className="text-[#141718] font-inter text-[12px]">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>

          {/* accordion tabs */}
          <AccordionTabs metafields={product?.metafields} />
        </div>
      </div>
    </div>
  );
}
