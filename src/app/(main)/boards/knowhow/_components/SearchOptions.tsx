import { FormEventHandler, useRef } from "react";
import { SEARCH_OPTIONS, TOption } from "../_constants";

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
    <form onSubmit={handleSearch} className="flex">
      <select value={selectedSearchOption} onChange={(e) => onSearchOptionChange(e.target.value)}>
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
