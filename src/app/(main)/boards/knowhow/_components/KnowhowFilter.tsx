"use client";
import SearchOptions from "@/app/(main)/boards/knowhow/_components/SearchOptions";
import SortOptions from "@/app/(main)/boards/knowhow/_components/SortOptions";
import { TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button/Button";
import Image from "next/image";

type KnowhowFilterTypes = {
  selectedSearchOption: TOption["value"];
  onSortOrderChange: (value: TOption["value"]) => void;
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
  sortOrder: TOption["value"];
};

function KnowhowFilter({
  selectedSearchOption,
  onSortOrderChange,
  onSearchOptionChange,
  onSearch,
  sortOrder
}: KnowhowFilterTypes) {
  const handleSortOrderChange = () => {
    onSortOrderChange;
  };
  return (
    <nav className="w-full h-12 mb-6 flex justify-between items-end">
      <SortOptions sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />

      <Button
        className="w-[124px] h-12 px-4 py-3.5 bg-main rounded-lg flex justify-center items-center gap-2.5"
        href={"/boards/knowhow/write"}
      >
        <Image src="/icons/mypage/pencil_white.png" width={20} height={20} alt="연필 이미지" className="w-5 h-5" />
        <span className="text-[#1b1b1b] text-base font-semibold leading-tight">글쓰기</span>
      </Button>
    </nav>
  );
}

export default KnowhowFilter;
