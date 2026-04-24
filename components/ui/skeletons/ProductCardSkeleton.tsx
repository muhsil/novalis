export default function ProductCardSkeleton() {
  return (
    <div className="product-card">
      {/* Image area — matches ProductCard's aspect-[4/5] bg-[#F9F7F2] */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#F9F7F2]">
        {/* Centered faux bottle silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[35%] h-[60%] skeleton rounded-[2rem] opacity-80" />
        </div>
        {/* Faux sale / featured tags (top-left) */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          <div className="h-4 w-10 skeleton" />
        </div>
        {/* Faux wishlist heart (top-right) */}
        <div className="absolute top-3 end-3 h-7 w-7 skeleton rounded-full" />
      </div>

      {/* Body — matches ProductCard text area */}
      <div className="px-2 pt-3 pb-3 text-center space-y-2">
        {/* Category pill */}
        <div className="h-2 w-14 skeleton mx-auto" />
        {/* Title line 1 */}
        <div className="h-3.5 w-4/5 skeleton mx-auto" />
        {/* Title line 2 */}
        <div className="h-3.5 w-3/5 skeleton mx-auto" />
        {/* Price */}
        <div className="h-4 w-1/3 skeleton mx-auto mt-2" />
      </div>
    </div>
  );
}
