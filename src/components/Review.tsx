"use client";
import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/actions/review.action";
import { getCookie } from "@/helper/Token";
import { decodeToken } from "@/helper/DecodedToken";
import { IUser } from "@/types/user.type";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReviewList from "./ProductDetails/ReviewList";
import { IReview } from "@/types/review.type";



export default function Review({ id, getReview }: { id: string; getReview:IReview[] }) {
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
        <ReviewList getReview={getReview}/>
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
