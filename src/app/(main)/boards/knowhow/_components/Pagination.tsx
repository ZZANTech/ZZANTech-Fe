"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import right from "/public/icons/filter/arrow_right.svg";
import left from "/public/icons/filter/arrow_left.svg";
import doubleRight from "/public/icons/filter/double_arrow_right.svg";
import doubleLeft from "/public/icons/filter/double_arrow_left.svg";
import Image from "next/image";

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

function Pagination({ itemsPerPage, totalItems, onPageChange }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageButtons = [];

  const baseButtonStyle = "w-8 h-8 flex items-center justify-center rounded-full border";
  const activeButtonStyle = "bg-black text-white";
  const inactiveButtonStyle = "bg-white text-black";

  const numberButtonStyle = "w-8 h-8 flex items-center justify-center rounded-full transition";
  const numberButtonActiveStyle = "bg-black text-white";
  const numberButtonInactiveStyle = "text-black hover:bg-black hover:text-white";

  const getButtonClasses = (isActive: boolean, isNumberButton: boolean = false) => {
    if (isNumberButton) {
      return `${numberButtonStyle} ${isActive ? numberButtonActiveStyle : numberButtonInactiveStyle}`;
    }
    return `${baseButtonStyle} ${isActive ? activeButtonStyle : inactiveButtonStyle}`;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  if (startPage > 1) {
    pageButtons.push(
      <button key="first" onClick={() => handlePageChange(1)} className={getButtonClasses(false)}>
        <Image src={doubleLeft} alt="double_left" />
      </button>
    );
  }

  if (startPage > 1) {
    pageButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, startPage - 10))}
        className={getButtonClasses(false)}
      >
        <Image src={left} alt="left" />
      </button>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button key={i} onClick={() => handlePageChange(i)} className={getButtonClasses(currentPage === i, true)}>
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, startPage + 10))}
        className={getButtonClasses(false)}
      >
        <Image src={right} alt="right" />
      </button>
    );
  }

  if (endPage < totalPages) {
    pageButtons.push(
      <button key="last" onClick={() => handlePageChange(totalPages)} className={getButtonClasses(false)}>
        <Image src={doubleRight} alt="double_right" />
      </button>
    );
  }

  useEffect(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  return <div className="flex items-center justify-center gap-1 w-full my-10">{pageButtons}</div>;
}

export default Pagination;
