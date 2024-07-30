"use client";
import SearchOptions from "@/app/(main)/boards/knowhow/_components/SearchOptions";
import SortOptions from "@/app/(main)/boards/knowhow/_components/SortOptions";
import { TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button/Button";

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
    <nav className="flex justify-between">
      <SortOptions sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />

      <Button
        className="bg-[#206CFF] px-5 py-3.5 border-none text-white text-center rounded-xl w-[167px] translate-y-[-24px]"
        href={"/boards/knowhow/write"}
      >
        글쓰기
      </Button>
    </nav>
  );
}

export default KnowhowFilter;
