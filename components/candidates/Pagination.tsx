'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type PaginationProps = {
  totalPages: number;
  dictionary: any;
};

export default function Pagination({ totalPages, dictionary }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      replace(createPageURL(page));
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center space-x-4 rtl:space-x-reverse">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        <FaArrowLeft />
        <span>{dictionary.previous}</span>
      </button>

      <span className="text-sm text-gray-700 dark:text-gray-300">
        {dictionary.page} {currentPage} {dictionary.of} {totalPages}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        <span>{dictionary.next}</span>
        <FaArrowRight />
      </button>
    </div>
  );
}
