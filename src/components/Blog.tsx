import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getBlog } from "@/actions/blog.action";
import { IBlog } from "@/types/blog.type";
export default async function Blog() {
    const data: IBlog[] = await getBlog(1, 3);

    return (
        <div>
            <div className="container mx-auto py-10 lg:pt-12 lg:pb-12 lg:px-0 max-[640px]:px-8 flex justify-between items-center">
                <h2 className="font-poppins font-medium lg:text-[20px] text-[16px] text-[#141718]">Latest Articles</h2>
                <div className="relative z-10 w-fit">
                    <button
                        className="group items-center justify-center flex cursor-pointer gap-1 text-[#141718] text-[14px] font-semibold 
                        before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
                        before:w-full before:bg-[#141718]"
                        aria-label="Shop Now"
                    >
                        View More
                        <ArrowRight
                            className="transition-transform duration-300 group-hover:-rotate-45"
                            color="#141718"
                            width={18}
                            height={18}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </div>

            <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 lg:px-0 max-[640px]:px-8 pb-12">
                {
                    data && data.map((item, i) => (
                        <div key={i}>
                            <div className="relative w-full lg:h-[325px] h-[280px]">
                                <Image
                                    src={item?.image[0] || ""}
                                    alt={item?.title || "blogImage"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-poppins lg:text-[20px] text-[16px] font-medium mt-6 mb-2">{item?.title}</h4>
                            <div className="relative z-10 w-fit">
                                <button
                                    className="group items-center justify-center flex cursor-pointer gap-1 text-[#141718] text-[14px] font-semibold 
                        before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
                        before:w-full before:bg-[#141718]"
                                    aria-label="Shop Now"
                                >
                                    Read More
                                    <ArrowRight
                                        className="transition-transform duration-300 group-hover:-rotate-45"
                                        color="#141718"
                                        width={18}
                                        height={18}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

