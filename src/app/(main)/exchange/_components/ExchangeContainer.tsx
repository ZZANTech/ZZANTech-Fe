"use client";
import { EXCHANGE_FILTER_OPTION, GIFTS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import GiftContainer from "@/app/(main)/exchange/_components/GiftContainer";
import ClaimContainer from "@/app/(main)/exchange/_components/ClaimContainer";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import { useState } from "react";

function ExchangeContainer() {
  const [filterOption, setFilterOption] = useState<TOption["value"]>(EXCHANGE_FILTER_OPTION[0].value);

  const handleFilterOptionChange = (value: TOption["value"]) => setFilterOption(value);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full justify-center">
        <FilterOption
          filterOption={filterOption}
          options={EXCHANGE_FILTER_OPTION}
          onFilterOptionChange={handleFilterOptionChange}
        />
      </div>
      {filterOption === GIFTS ? <GiftContainer /> : <ClaimContainer />}
    </div>
  );
}

export default ExchangeContainer;
