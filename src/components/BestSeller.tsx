import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/actions/product.action";
import { Star } from "lucide-react";
import { Product } from "@/types/product.type";
export default async function BestSeller() {
    const products:Product[] = await getProduct("best-seller", 1, 8);
    return (
        <>
            <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto py-10 lg:py-12 px-8">
                <h2 className="text-[34px] lg:text-[40px] text-[#23262F] center font-poppins font-medium text-center mb-4 lg:mb-11">
                    Best Seller
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 sm:gap-2 gap-2">
                    {
                        products && products.map((item, i) => (
                            <div key={i}>
                                <Link href={`/product/${item?._id}`}>
                                    <div className="relative group">
                                        <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <Image
                                            className="w-full object-cover aspect-[300/349]"
                                            src={item?.featureImage}
                                            width={300}
                                            height={349}
                                            alt="best seller"
                                        />
                                    </div>
                                </Link>
                                <div className="flex items-center gap-0.5 mt-3 mb-1">
                                    {Array.from({ length: Math.floor(item?.rating?.average || 0) }).map(
                                        (_, index) => (
                                            <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                                        )
                                    )}
                                    {Array.from({
                                        length: 5 - Math.floor(item?.rating?.average || 0),
                                    }).map((_, index) => (
                                        <Star width={16} height={16} key={index} className="text-[#6C7275] fill-[#6C7275]" />
                                    ))}
                                    <span className="ml-1.5 font-inter text-sm font-medium">({item?.rating?.average})</span>
                                </div>
                                <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                                    {item?.title}
                                </h2>
                                <div className="flex items-center gap-3">
                                    <p className="text-[14px] font-semibold text-[#141718]">
                                        TK. {item?.basePrice}
                                    </p>
                                    <p className="text-[14px] font-normal text-[#6C7275] line-through">
                                        TK. {item?.compareAtPrice}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

