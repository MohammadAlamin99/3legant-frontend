export default function CollectionSkeleton() {
  return (
    <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto py-10 lg:py-12 max-[640px]:px-8 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-4 gap-4 max-[768px]:px-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="relative animate-pulse">
          {/* Image Placeholder */}
          <div className="w-full h-[377px] lg:h-[664px] md:h-[500px] bg-gray-200 rounded-md" />

          {/* Text Overlay Placeholder */}
          <div className="absolute left-8 bottom-8 lg:left-12 lg:bottom-12 md:left-8 md:bottom-8">
            <div className="h-7 w-40 bg-gray-300 rounded mb-2 lg:h-8 lg:w-48"></div>
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
