"use client";

import SortOptions from "@/app/(main)/boards/knowhow/_components/SortOptions";
import { TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button";
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
      <Button variant="main" size="medium" weight="semibold" href="/boards/knowhow/write">
        <Image src="/icons/mypage/pencil_white.png" width={20} height={20} alt="연필 이미지" className="mr-2" />
        글쓰기
      </Button>
    </nav>
  );
}

export default KnowhowFilter;
