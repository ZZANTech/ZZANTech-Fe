"use client";
import { FormEventHandler, useRef } from "react";
import { SEARCH_OPTIONS, SORT_OPTIONS, TOption } from "../_constants";

type KnowhowFilterTypes = {
  sortOrder: TOption["value"];
  selectedSearchOption: TOption["value"];
  onSortOrderChange: (value: TOption["value"]) => void;
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
};

function KnowhowFilter({
  sortOrder,
  selectedSearchOption,
  onSortOrderChange,
  onSearchOptionChange,
  onSearch
}: KnowhowFilterTypes) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInputRef.current) {
      onSearch(searchInputRef.current.value);
    }
  };

  return (
    <div className=" flex">
      <div>
        {SORT_OPTIONS.map((option) => (
          <button key={option.value} onClick={() => onSortOrderChange(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex">
        <div>
          <select value={selectedSearchOption} onChange={(e) => onSearchOptionChange(e.target.value)}>
            {SEARCH_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSearch}>
          <input ref={searchInputRef} type="text" placeholder="검색어를 입력해주세요" />
          <button>돋보기</button>
        </form>
      </div>
    </div>
  );
}

export default KnowhowFilter;
