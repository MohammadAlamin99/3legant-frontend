export default function BestSellerSkeleton() {
    return (
        <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto py-10 lg:py-12 px-8">
            <h2 className="text-[34px] lg:text-[40px] text-[#23262F] font-poppins font-medium text-center mb-4 lg:mb-11">
                Best Seller
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 sm:gap-2 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                        {/* image skeleton */}
                        <div className="w-full aspect-[300/349] bg-gray-200 rounded-md" />

                        {/* rating skeleton */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>

                        {/* title skeleton */}
                        <div className="h-5 w-3/4 bg-gray-300 rounded mt-2" />

                        {/* price skeleton */}
                        <div className="flex gap-3 mt-2">
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
