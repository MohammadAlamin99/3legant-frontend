export default function CategorySkeleton() {
  return (
    <div className="container px-[32px] lg:px-0 md:px-0 sm:px-0 mx-auto py-10 lg:py-12">
      <h2 className="text-[34px] lg:text-[40px] text-[#23262F] font-poppins font-medium text-center mb-12">
        Shop by Categories
      </h2>

      <div className="lg:px-3 md:px-3 sm:px-3 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 max-[300px]:grid-cols-1 gap-2 lg:gap-6 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center flex-col gap-3 animate-pulse"
          >
            {/* Circle Image Placeholder */}
            <div className="relative lg:w-[167px] lg:h-[167px] w-[152px] h-[152px] max-[380px]:w-[120px] max-[380px]:h-[120px] rounded-full bg-gray-200" />

            {/* Text Placeholder */}
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
