"use client";
import Button from "@/components/Button/Button";
import { TOption } from "../_constants";
import SearchOptions from "./SearchOptions";
import SortOptions from "./SortOptions";

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
    <nav className="flex">
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
