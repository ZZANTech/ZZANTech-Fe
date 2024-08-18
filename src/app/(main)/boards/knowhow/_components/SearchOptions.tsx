"use client";
import { SEARCH_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import Image from "next/image";
import searchWeb from "/public/icons/filter/search_web.svg";
import searchMobile from "/public/icons/filter/search_mobile.svg";
import { FormEventHandler, useRef } from "react";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import clsx from "clsx";
import arrowDown from "/public/icons/filter/arrow_down.svg";

type SearchOptionsProps = {
  isDetailPage?: boolean;
  selectedSearchOption: TOption["value"];
  onSearchOptionChange: (value: TOption["value"]) => void;
  onSearch: (keyword: string) => void;
};

function SearchOptions({ isDetailPage, selectedSearchOption, onSearch, onSearchOptionChange }: SearchOptionsProps) {
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
      className={clsx(
        "flex h-8 justify-center gap-4 self-center mb-24 mt-10",
        "md:h-10 md:mb-11 md:mt-[60px]",
        isDetailPage && "mb-0"
      )}
    >
      <div className="relative inline-block w-24 md:w-[118px]">
        <select
          className="
      w-full h-8 px-2 border items-center text-sm border-gray-900 rounded appearance-none
      md:px-3 md:h-10 leading-normal
    "
          value={selectedSearchOption}
          onChange={(e) => onSearchOptionChange(e.target.value)} // 수정된 부분
        >
          {SEARCH_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src={arrowDown}
          alt="검색옵션 선택"
          width={16}
          height={16}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      </div>

      <div
        className="
      flex w-[212px] justify-between items-center p-2 border-b  border-line-black
      md:w-[277px] md:border-b-2"
      >
        <input
          className="
          placeholder:text-gray-400 w-[156px] outline-none
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
