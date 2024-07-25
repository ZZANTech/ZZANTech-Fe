"use client";

type KnowhowPaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

function KnowhowPagination({ currentPage, itemsPerPage, totalItems, onPageChange }: KnowhowPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageButtons = [];

  const baseButtonStyle = "w-8 h-8 flex items-center justify-center rounded-full border";
  const activeButtonStyle = "bg-black text-white";
  const inactiveButtonStyle = "bg-white text-black";

  const getButtonClasses = (isActive: boolean) => {
    return `${baseButtonStyle} ${isActive ? activeButtonStyle : inactiveButtonStyle}`;
  };

  pageButtons.push(
    <button key={1} onClick={() => onPageChange(1)} className={getButtonClasses(currentPage === 1)}>
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
      <button key={i} onClick={() => onPageChange(i)} className={getButtonClasses(currentPage === i)}>
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
        onClick={() => onPageChange(totalPages)}
        className={getButtonClasses(currentPage === totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>
      {pageButtons}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
}

export default KnowhowPagination;
