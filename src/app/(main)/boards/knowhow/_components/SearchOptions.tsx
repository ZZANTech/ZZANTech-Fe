import { SEARCH_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import { FormEventHandler, useRef } from "react";

type SearchOptionsProps = {
  selectedSearchOption: TOption["value"];
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
};

function SearchOptions({ selectedSearchOption, onSearch, onSearchOptionChange }: SearchOptionsProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInputRef.current) {
      onSearch(searchInputRef.current.value);
    }
  };
  return (
    <form onSubmit={handleSearch} className=" flex absolute right-[5%]">
      <select
        className="w-[118px] h-10 px-3 py-2  border border-gray-500 rounded-lg"
        value={selectedSearchOption}
        onChange={(e) => onSearchOptionChange(e.target.value)}
      >
        {SEARCH_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <input ref={searchInputRef} type="text" placeholder="검색어를 입력해주세요" />
        <button>돋보기</button>
      </div>
    </form>
  );
}

export default SearchOptions;
