"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type KnowhowPaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

function KnowhowPagination({ itemsPerPage, totalItems, onPageChange }: KnowhowPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageButtons = [];

  const baseButtonStyle = "w-8 h-8 flex items-center justify-center rounded-full border";
  const activeButtonStyle = "bg-black text-white";
  const inactiveButtonStyle = "bg-white text-black";

  const getButtonClasses = (isActive: boolean) => {
    return `${baseButtonStyle} ${isActive ? activeButtonStyle : inactiveButtonStyle}`;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    router.push(`?page=${page}`);
  };

  pageButtons.push(
    <button key={1} onClick={() => handlePageChange(1)} className={getButtonClasses(currentPage === 1)}>
      1
    </button>
  );

  let startPage = Math.max(2, currentPage - 2);
  let endPage = Math.min(totalPages - 1, currentPage + 2);

  if (startPage > 2) {
    pageButtons.push(
      <span key="start-ellipsis" className="w-8 h-8 flex items-center justify-center">
        ...
      </span>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button key={i} onClick={() => handlePageChange(i)} className={getButtonClasses(currentPage === i)}>
        {i}
      </button>
    );
  }

  if (endPage < totalPages - 1) {
    pageButtons.push(
      <span key="end-ellipsis" className="w-8 h-8 flex items-center justify-center">
        ...
      </span>
    );
  }

  if (totalPages > 1) {
    pageButtons.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={getButtonClasses(currentPage === totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  useEffect(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>
      {pageButtons}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
}

export default KnowhowPagination;
