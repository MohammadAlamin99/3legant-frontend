import Image from "next/image";
import { getBlog } from "@/actions/blog.action";
import { IBlog } from "@/types/blog.type";
import CommonButton2 from "./button/CommonButton2";
export default async function Blog() {
  const data: IBlog[] = await getBlog(1, 3);

  return (
    <div>
      <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container mx-auto py-10 lg:pt-12 lg:pb-12 flex justify-between items-center">
        <h2 className="font-poppins font-medium lg:text-[20px] text-[16px] text-[#141718]">
          Latest Articles
        </h2>
        <div className="relative z-10 w-fit">
          <CommonButton2
            url="#"
            buttonText="View More"
            color="#141718"
            bgColor="#141718"
          />
        </div>
      </div>
      <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 pb-12">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <div className="relative w-full lg:h-[325px] h-[280px]">
                <Image
                  src={item?.image[0] || ""}
                  alt={item?.title || "blogImage"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <h4 className="font-poppins lg:text-[20px] text-[16px] font-medium mt-6 mb-2">
                {item?.title}
              </h4>
              <div className="relative z-10 w-fit">
                <CommonButton2
                  url="#"
                  buttonText="Read More"
                  color="#141718"
                  bgColor="#141718"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
