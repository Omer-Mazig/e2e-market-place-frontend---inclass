import React from "react";

function Pagination({ page, productCount, handlePageChange }) {
  const totalPages = Math.ceil(productCount / 5); // Assuming 10 products per page

  if (!productCount) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="rounded bg-gray-200 px-4 py-2"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded bg-gray-200 px-4 py-2"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
