"use client";
import { SEARCH_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import Image from "next/image";
import searchWeb from "/public/icons/filter/search_web.svg";
import searchMobile from "/public/icons/filter/search_mobile.svg";
import { FormEventHandler, useRef } from "react";
import useIsWideScreen from "@/hooks/useIsWideScreen";

type SearchOptionsProps = {
  selectedSearchOption: TOption["value"];
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
};

function SearchOptions({ selectedSearchOption, onSearch, onSearchOptionChange }: SearchOptionsProps) {
  const { isWideScreen } = useIsWideScreen();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInputRef.current) {
      onSearch(searchInputRef.current.value);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="
    flex  h-8 justify-center gap-4 self-center mb-24 mt-10
    md:h-10 md:mb-11 md:mt-[60px]
    
    "
    >
      <select
        className="
        w-24  h-8  p-2  border text-sm border-gray-900 rounded flex self-center 
        md:px-3 md:w-[118px]  md:py-2 md:h-10

        "
        value={selectedSearchOption}
        onChange={(e) => onSearchOptionChange(e.target.value)}
      >
        {SEARCH_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className="
      flex w-[212px] justify-between items-center p-2 border-b  border-line-black
      md:w-[277px] md:border-b-2"
      >
        <input
          className="
          placeholder:text-gray-400 w-[156px] font-semibold outline-none
          md:w-[216px]
          "
          ref={searchInputRef}
          type="text"
          placeholder="검색어를 입력해주세요"
        />
        <button
          className="
        w-6 h-6 flex
        md:w-8 md:h-8
        "
        >
          <Image
            src={isWideScreen ? searchWeb : searchMobile}
            alt="search"
            width={isWideScreen ? 32 : 24}
            height={isWideScreen ? 32 : 24}
          />
        </button>
      </div>
    </form>
  );
}

export default SearchOptions;
