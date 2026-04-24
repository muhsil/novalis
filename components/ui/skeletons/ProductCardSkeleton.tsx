export default function ProductCardSkeleton() {
  return (
    <div className="product-card">
      {/* Image area — matches ProductCard's aspect-[4/5] bg-[#F9F7F2] */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#F9F7F2]">
        {/* Centered faux bottle silhouette matching a perfume flacon shape */}
        <div className="absolute inset-0 flex items-end justify-center pb-[14%]">
          <div className="relative flex flex-col items-center gap-[2px] opacity-80">
            {/* cap */}
            <div className="skeleton w-[16%] h-[14%] aspect-square" style={{ width: '22px', height: '14px' }} />
            {/* neck */}
            <div className="skeleton" style={{ width: '14px', height: '10px' }} />
            {/* body */}
            <div className="skeleton rounded-[6px]" style={{ width: '78px', height: '120px' }} />
          </div>
        </div>
        {/* Faux sale / featured tag (top-left) */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          <div className="h-[14px] w-10 skeleton rounded-sm" />
        </div>
        {/* Faux wishlist heart (top-right) */}
        <div className="absolute top-3 end-3 h-7 w-7 skeleton rounded-full" />
      </div>

      {/* Body — matches ProductCard text area */}
      <div className="px-2 pt-3 pb-3 text-center space-y-2">
        {/* Category pill */}
        <div className="h-[10px] w-16 skeleton mx-auto rounded-sm" />
        {/* Title line 1 */}
        <div className="h-[14px] w-4/5 skeleton mx-auto rounded-sm" />
        {/* Title line 2 */}
        <div className="h-[14px] w-3/5 skeleton mx-auto rounded-sm" />
        {/* Price */}
        <div className="h-[16px] w-1/3 skeleton mx-auto mt-2 rounded-sm" />
      </div>
    </div>
  );
}
