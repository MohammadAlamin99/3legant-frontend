import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icollection } from "@/types/collection.type";
import { getCollection } from "@/actions/collection.action";

export default async function Category() {
  const collection:Icollection[] = await getCollection("shop_by_category");
  return (
    <div className="container px-[32px] lg:px-0 md:px-0 sm:px-0 mx-auto py-10 lg:py-12">
      <h2 className="text-[34px] lg:text-[40px] text-[#23262F] center font-poppins font-medium text-center mb-12">
        Shop by Categories
      </h2>
      <div className="lg:px-3 md:px-3 sm:px-3 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 max-[300px]:grid-cols-1 gap-2 lg:gap-6 md:gap-6">
        {collection &&
          collection.map((item, id) => (
            <div className="flex items-center flex-col gap-3" key={id}>
              <Link href={"/collection/" + item?._id}>
                <div className="relative lg:w-[167px] lg:h-[167px] w-[152px] h-[152px] max-[380px]:w-[120px] max-[380px]:h-[120px] rounded-full overflow-hidden">
                  <Image
                    className="object-cover"
                    src={item?.image || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={item?.name || "Profile image"}
                    priority
                  />
                </div>
              </Link>

              <h2 className="font-inter text-center text-[14px] font-semibold text-[#121212]">
                {item?.name}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}
