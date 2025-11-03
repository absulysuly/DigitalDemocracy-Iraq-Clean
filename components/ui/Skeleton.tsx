export function Skeleton() {
  return (
    <div className="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
  )
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  )
}
