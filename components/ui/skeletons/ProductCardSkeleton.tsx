export default function ProductCardSkeleton() {
  return (
    <div className="product-card animate-pulse">
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#F9F7F2]">
        {/* Centered faux bottle silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-3/5 bg-[#eee4e6] rounded-[2rem] skeleton opacity-70" />
        </div>
        {/* Faux tag */}
        <div className="absolute top-3 start-3 h-4 w-12 skeleton rounded-sm" />
        {/* Faux wishlist */}
        <div className="absolute top-3 end-3 h-8 w-8 skeleton rounded-full" />
      </div>

      {/* Body */}
      <div className="px-2 pt-3 pb-3 text-center space-y-2">
        {/* Category */}
        <div className="h-2.5 w-16 skeleton mx-auto" />
        {/* Title line 1 */}
        <div className="h-4 w-4/5 skeleton mx-auto" />
        {/* Title line 2 */}
        <div className="h-4 w-2/3 skeleton mx-auto" />
        {/* Price */}
        <div className="h-4 w-1/3 skeleton mx-auto mt-3" />
      </div>
    </div>
  );
}
