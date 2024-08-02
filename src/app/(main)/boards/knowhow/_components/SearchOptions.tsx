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
    <form onSubmit={handleSearch} className="flex justify-center gap-4 self-center mb-[93px]">
      <select
        className="w-[118px] h-10 px-3 py-2  border border-gray-500 rounded-lg "
        value={selectedSearchOption}
        onChange={(e) => onSearchOptionChange(e.target.value)}
      >
        {SEARCH_OPTIONS.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex justify-between p-2 border-b border-[#111111] w-[277px]">
        <input
          className="placeholder:text-[#767676] font-semibold"
          ref={searchInputRef}
          type="text"
          placeholder="검색어를 입력해주세요"
        />
        <button>돋보기</button>
      </div>
    </form>
  );
}

export default SearchOptions;
