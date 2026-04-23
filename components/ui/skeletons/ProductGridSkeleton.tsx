import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductGridSkeletonProps {
  count?: number;
  showFilters?: boolean;
  showHeader?: boolean;
}

export default function ProductGridSkeleton({
  count = 10,
  showFilters = true,
  showHeader = true,
}: ProductGridSkeletonProps) {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header / results count */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="h-3 w-32 skeleton" />
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8 w-28 skeleton rounded-full" />
            <div className="h-8 w-24 skeleton rounded-full" />
          </div>
        </div>
      )}

      {/* Filter chips */}
      {showFilters && (
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-20 skeleton rounded-full shrink-0" />
          ))}
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-md:gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
