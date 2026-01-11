export default function Pagination({ page, total, setPage }) {
  const pageSize = 5;
  const pages = Math.ceil(total / pageSize);

  if (pages <= 1) return null;

  const canGoPrev = page > 0;
  const canGoNext = page < pages - 1;

  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{page * pageSize + 1}</span> to{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {Math.min((page + 1) * pageSize, total)}
        </span>{" "}
        of <span className="font-semibold text-gray-900 dark:text-gray-100">{total}</span> results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={!canGoPrev}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            canGoPrev
              ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {[...Array(pages)].map((_, i) => {
            // Show first page, last page, current page, and pages around current
            const showPage = i === 0 || i === pages - 1 || Math.abs(i - page) <= 1;
            const showEllipsis = (i === 1 && page > 2) || (i === pages - 2 && page < pages - 3);

            if (showEllipsis) {
              return (
                <span key={i} className="px-2 text-gray-400 dark:text-gray-600">
                  ...
                </span>
              );
            }

            if (!showPage) return null;

            return (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  page === i
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={!canGoNext}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            canGoNext
              ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
