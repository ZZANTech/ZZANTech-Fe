"use client";
import { EXCHANGE_FILTER_OPTION, GIFTS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import GiftContainer from "@/app/(main)/exchange/_components/GiftContainer";
import ClaimContainer from "@/app/(main)/exchange/_components/ClaimContainer";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import { useState } from "react";
import { Tables } from "@/types/supabase";

function ExchangeContainer({ gifts }: { gifts: Tables<"gifts">[] }) {
  const [filterOption, setFilterOption] = useState<TOption["value"]>(EXCHANGE_FILTER_OPTION[0].value);

  const handleFilterOptionChange = (value: TOption["value"]) => setFilterOption(value);
  return (
    <div className="w-full">
      <FilterOption options={EXCHANGE_FILTER_OPTION} onFilterOptionChange={handleFilterOptionChange} />
      {filterOption === GIFTS ? <GiftContainer gifts={gifts} /> : <ClaimContainer />}
    </div>
  );
}

export default ExchangeContainer;
