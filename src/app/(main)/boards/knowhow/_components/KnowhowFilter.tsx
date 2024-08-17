"use client";

import SortOptions from "@/app/(main)/boards/knowhow/_components/SortOptions";
import { TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import clsx from "clsx";
import Image from "next/image";

type KnowhowFilterTypes = {
  selectedSearchOption: TOption["value"];
  onSortOrderChange: (value: TOption["value"]) => void;
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
  sortOrder: TOption["value"];
};

function KnowhowFilter({ onSortOrderChange, sortOrder }: KnowhowFilterTypes) {
  const { isWideScreen } = useIsWideScreen();

  return (
    <nav
      className="
    flex-col-reverse items-start w-full mb-3 flex h-24 gap-9 
    md:flex-row md:justify-between md:items-end md:h-12 md:mb-6 md:gap-0
    "
    >
      <SortOptions sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />
      <Button
        className={clsx(!isWideScreen && "w-[100px] h-9 px-2 py-3")}
        variant="main"
        size="medium"
        weight="semibold"
        href="/boards/knowhow/write"
      >
        <div className="flex items-center justify-between gap-1">
          <Image src="/icons/mypage/pencil_white.png" width={20} height={20} alt="연필 이미지" />
          <span className="w-[60px] text-center">글쓰기</span>
        </div>
      </Button>
    </nav>
  );
}

export default KnowhowFilter;
