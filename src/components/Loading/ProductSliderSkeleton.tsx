"use client";
export default function ProductSliderSkeleton() {
  return (
    <div
    className="grid xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <div className="animate-pulse">
            <div className="w-full h-[308px] lg:h-[349px] md:h-[320px] sm:h-[310px] bg-gray-200 rounded-md" />
            <div className="w-full h-10 bg-gray-300 rounded-md mt-3 mx-auto" />
            <div className="flex items-center gap-2 mt-3">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-8 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-3/4 bg-gray-300 rounded mt-2" />
            <div className="flex gap-3 mt-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
