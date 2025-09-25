import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Prev Button */}
      <button
        disabled={page === 1}
        onClick={() => setPage(Math.max(page - 1, 1))}
        className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm font-medium transition
          ${page === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-700"
          }`}
      >
        <FiChevronLeft size={18} />
        Prev
      </button>

      {/* Page Info */}
      <span className="text-sm font-medium text-gray-600">
        Page <span className="text-gray-900">{page}</span> of{" "}
        <span className="text-gray-900">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm font-medium transition
          ${page === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-700"
          }`}
      >
        Next
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}
