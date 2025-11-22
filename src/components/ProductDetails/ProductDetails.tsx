import ColorVarients from "./ColorVarients";
import ThumsSlider from "./ThumsSlider";
import { Product } from "@/types/product.type";
import { IProductVariant } from "@/types/variant.type";
import AccordionTabs from "./AccordionTabs";
import ProductRating from "../Slider/ProductRating";

interface ProductDetailsProps {
  product: Product;
}
export default function ProdcutDetails({ product }: ProductDetailsProps) {
  return (
    <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 md:gap-10 gap-4">
        <div className="space-y-6">
          <ThumsSlider product={product} />
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <ProductRating item={product} />
            <span className="text-[#141718] text-[12px] font-inter font-normal mt-2.5">
              {product?.rating?.count || 0} Reviews
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
