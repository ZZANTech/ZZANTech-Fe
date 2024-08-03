"use client";
import { EXCHANGE_FILTER_OPTION, GIFTS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import GiftContainer from "@/app/(main)/exchange/_components/GiftContainer";
import ClaimContainer from "@/app/(main)/exchange/_components/ClaimContainer";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ExchangeContainer() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || EXCHANGE_FILTER_OPTION[0].value;
  const [filterOption, setFilterOption] = useState<TOption["value"]>(initialFilter);

  const handleFilterOptionChange = (value: TOption["value"]) => setFilterOption(value);
  useEffect(() => {
    const filterFromParams = searchParams.get("filter");
    if (filterFromParams && filterFromParams !== filterOption) {
      setFilterOption(filterFromParams);
    }
  }, [searchParams, filterOption]);

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
