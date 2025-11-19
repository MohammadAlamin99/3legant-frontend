"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import img from "../../public/images/promotion_banner.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/actions/review.action";
import { getCookie } from "@/helper/Token";
import { decodeToken } from "@/helper/DecodedToken";
import { IUser } from "@/types/user.type";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Review({ id }: { id: string }) {
  const token: string | undefined = getCookie("token");
  const decoded: IUser | null = decodeToken(token);
  const userId: string | undefined = decoded?.userId;
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) =>
      createReview(
        token || "",
        userId || "",
        id,
        rating,
        commentRef.current?.value || ""
      ),
    onSuccess: (createReveiw) => {
      if (createReveiw.status === "success") {
        toast.success(createReveiw.message);
        queryClient.invalidateQueries({ queryKey: ["review"] });
      } else {
        toast.error(createReveiw.message);
      }
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to review");
    },
  });

  const reviewHandler = () => {
    if (!rating) {
      toast.error("Please select rating ⭐");
      return;
    }
    if (!token) {
      toast.error("Please login to review");
      return;
    }
    mutate(id);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8">
        <h3 className="text-2xl font-poppins font-medium mb-6">
          Customer Reviews
        </h3>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => {
                const fullValue = star;
                const halfValue = star - 0.5;

                return (
                  <div key={star} className="relative w-7 h-7">
                    <div
                      className="absolute left-0 top-0 w-1/2 h-full z-20"
                      onMouseEnter={() => setHover(halfValue)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(halfValue)}
                    ></div>
                    <div
                      className="absolute right-0 top-0 w-1/2 h-full z-20"
                      onMouseEnter={() => setHover(fullValue)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(fullValue)}
                    ></div>

                    <Star
                      size={28}
                      fill={
                        (hover || rating) >= fullValue
                          ? "#141718"
                          : (hover || rating) >= halfValue
                          ? "url(#half-star)"
                          : "none"
                      }
                      color="#141718"
                      className="transition-all"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <svg width="0" height="0">
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="#141718" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 rounded-xl bg-white p-4 gap-4 mb-10">
          <textarea
            ref={commentRef}
            className="w-full md:w-4/5 text-sm placeholder:text-[#141718] font-poppins placeholder:font-poppins border-none focus:ring-0 resize-none outline-0"
            placeholder="Write review *"
            rows={3}
          />
          <button
            onClick={reviewHandler}
            className="bg-black text-white broder font-inter border-2 border-[#E8ECEF] rounded-full px-10 py-2 text-sm font-medium"
          >
            Write Review
          </button>
        </div>

        <h2 className="text-xl font-medium font-poppins mb-6">11 Reviews</h2>
        <div className="space-y-6">
          {[1, 2].map((id) => (
            <div
              key={id}
              className="flex max-[575px]:flex-col gap-6 border-b border-gray-200 pb-6"
            >
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
      <ToastContainer />
    </div>
  );
}
