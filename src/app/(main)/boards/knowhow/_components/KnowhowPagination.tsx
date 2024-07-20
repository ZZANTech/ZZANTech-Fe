"use client";
type KnowhowPaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

function KnowhowPagination({ currentPage, itemsPerPage, totalItems, onPageChange }: KnowhowPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "bg-blue-200" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
}

export default KnowhowPagination;
