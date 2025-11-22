const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm overflow-hidden relative">
      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />

      {/* Card */}
      <div className="animate-pulse">
        {/* Image Placeholder */}
        <div className="h-[260px] w-full bg-gray-200"></div>

        {/* Content */}
        <div className="p-8 space-y-3">
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 w-32 bg-gray-200 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
