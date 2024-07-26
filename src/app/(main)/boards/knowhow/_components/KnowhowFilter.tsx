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
};

function KnowhowFilter({
  selectedSearchOption,
  onSortOrderChange,
  onSearchOptionChange,
  onSearch
}: KnowhowFilterTypes) {
  return (
    <nav className="flex justify-between">
      <SortOptions onSortOrderChange={onSortOrderChange} />
      <SearchOptions
        onSearch={onSearch}
        onSearchOptionChange={onSearchOptionChange}
        selectedSearchOption={selectedSearchOption}
      />
      <Button href={"/boards/knowhow/write"}>새 글작성</Button>
    </nav>
  );
}

export default KnowhowFilter;
