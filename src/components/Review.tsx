"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import img from "../../public/images/promotion_banner.jpg";

export default function Review() {
  return (
    <section className="py-10">
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8">
        <h3 className="text-2xl font-poppins font-medium mb-6">
          Customer Reviews
        </h3>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  <Star />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 rounded-xl bg-white p-4 gap-4 mb-10">
          <textarea
            className="w-full md:w-4/5 text-sm placeholder:text-[#141718] font-poppins placeholder:font-poppins border-none focus:ring-0 resize-none outline-0"
            placeholder="Write review *"
            rows={3}
          />
          <button className="bg-black text-white broder font-inter border-2 border-[#E8ECEF] rounded-full px-10 py-2 text-sm font-medium">
            Write Review
          </button>
        </div>

        <h2 className="text-xl font-medium font-poppins mb-6">11 Reviews</h2>
        <div className="space-y-6">
          {[1, 2].map((id) => (
            <div key={id} className="flex max-[575px]:flex-col gap-6 border-b border-gray-200 pb-6">
              <div className="relative flex-shrink-0 w-[72px] h-[72px]">
                <Image
                  className="rounded-full object-cover"
                  src={img}
                  alt="Reviewer"
                  fill
                />
              </div>
              <div>
                <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
                  John Doe
                </h3>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star width={16} height={16} key={i} />
                  ))}
                </div>
                <p className="text-[#353945] font-inter font-normal text-sm">
                  I bought it 3 weeks ago and now come back just to say “Awesome
                  Product”. I really enjoy it. At vero eos et accusamus et iusto
                  odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupt et quas molestias excepturi sint non
                  provident.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          <button className="border font-inter font-medium border-[#141718] rounded-full px-10 py-2 text-sm text-[#141718] cursor-pointer">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
