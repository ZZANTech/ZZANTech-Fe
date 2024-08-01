"use client";
import { EXCHANGE_FILTER_OPTION, GIFTS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import ClaimContainer from "@/app/(main)/exchange/_components/ClaimContainer";
import GiftContainer from "@/app/(main)/exchange/_components/GiftContainer";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import { useState } from "react";

function ExchangeContainer() {
  const [filterOption, setFilterOption] = useState<TOption["value"]>(EXCHANGE_FILTER_OPTION[0].value);

  const handleFilterOptionChange = (value: TOption["value"]) => setFilterOption(value);
  return (
    <>
      <FilterOption options={EXCHANGE_FILTER_OPTION} onFilterOptionChange={handleFilterOptionChange} />
      {filterOption === GIFTS ? <GiftContainer /> : <ClaimContainer />}
    </>
  );
}

export default ExchangeContainer;
