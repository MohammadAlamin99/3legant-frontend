
export default function BlogSkeleton() {
    return (
        <div>
            {/* Header */}
            <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container mx-auto py-10 lg:pt-12 lg:pb-12 flex justify-between items-center">
                <h2 className="font-poppins font-medium lg:text-[20px] text-[16px] text-[#141718]">Latest Articles</h2>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Blog Cards */}
            <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 pb-12">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                        {/* Image Placeholder */}
                        <div className="relative w-full lg:h-[325px] h-[280px] bg-gray-200 rounded-md" />

                        {/* Title Placeholder */}
                        <div className="h-5 w-3/4 bg-gray-300 rounded mt-6 mb-2"></div>

                        {/* Button Placeholder */}
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
