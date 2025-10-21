import { getCollection } from "@/actions/collection.action";
import { Icollection } from "@/types/collection.type";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function Collection() {
  const collection: Icollection[] = await getCollection("collection");
  return (
    <>
      <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto py-10 lg:py-12 max-[640px]:px-8 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-4 gap-4 max-[768px]:px-3">
        {
          collection && collection.map((item, i) => (
            <div className="relative" key={i}>
              <div className="relative z-0 w-full h-[377px] lg:w-full lg:h-[664px] md:h-[500px] after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_67.59%,rgba(0,0,0,0.32)_83.07%)]">
                <Image
                  src={item?.image || ""}
                  fill
                  alt={item?.name || "Collection image"}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="absolute z-10 lg:left-12 lg:bottom-12 md:left-8 md:bottom-8 left-8 bottom-8">
                <h2 className="font-poppins text-[28px] text-white font-medium lg:text-[34px]">
                  {item?.name}
                </h2>
                <div className="w-fit">
                  <Link href={`/collection/${item?._id}`}>
                    <button className="relative group items-center justify-center flex cursor-pointer gap-1 text-white text-[14px] font-semibold 
                    before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:bg-white"
                      aria-label="Shop Now"
                    >
                      Collection
                      <ArrowRight
                        className="transition-transform duration-300 group-hover:-rotate-45"
                        color="#FFFFFF"
                        width={18}
                        height={18}
                        strokeWidth={2}
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </>
  );
}
