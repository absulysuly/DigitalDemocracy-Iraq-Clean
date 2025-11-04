import Skeleton from './UI/Skeleton';

export default function SkeletonPostCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Image Skeleton */}
      <Skeleton className="w-full h-48" />

      {/* Engagement Stats Skeleton */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-around gap-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  );
}
