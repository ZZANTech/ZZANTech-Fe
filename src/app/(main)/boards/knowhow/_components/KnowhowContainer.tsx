"use client";
import useKnowhowsQuery from "@/stores/queries/useKnowhowsQuery";
import { Suspense, useEffect, useState } from "react";
import KnowhowFilter from "@/app/(main)/boards/knowhow/_components/KnowhowFilter";
import KnowhowPagination from "@/app/(main)/boards/knowhow/_components/KnowhowPagination";
import { ITEMS_PER_PAGE, SEARCH_OPTIONS, SORT_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import dynamic from "next/dynamic";
import SearchOptions from "@/app/(main)/boards/knowhow/_components/SearchOptions";

const KnowhowList = dynamic(() => import("@/app/(main)/boards/knowhow/_components/KnowhowList"), {
  loading: () => (
    <ul className="flex flex-col  gap-8 mb-[13px]">
      <li className="w-full h-[220px] bg-gray-50 rounded-xl px-10 py-5"></li>
      <li className="w-full h-[220px] bg-gray-50 rounded-xl px-10 py-5"></li>
      <li className="w-full h-[220px] bg-gray-50 rounded-xl px-10 py-5"></li>
      <li className="w-full h-[220px] bg-gray-50 rounded-xl px-10 py-5"></li>
    </ul>
  ),
  ssr: false
});

function KnowhowContainer() {
  const [sortOrder, setSortOrder] = useState<TOption["value"]>(SORT_OPTIONS[0].value);
  const [selectedSearchOption, setSelectedSearchOption] = useState<TOption["value"]>(SEARCH_OPTIONS[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: knowhows } = useKnowhowsQuery(
    currentPage,
    ITEMS_PER_PAGE,
    sortOrder,
    selectedSearchOption,
    searchKeyword
  );
  const totalItems = knowhows?.posts[0]?.total_count;

  const handleSortOrderChange = (value: TOption["value"]) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleSearchOptionChange = (value: TOption["value"]) => {
    setSelectedSearchOption(value);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <KnowhowFilter
        selectedSearchOption={selectedSearchOption}
        onSortOrderChange={handleSortOrderChange}
        onSearchOptionChange={handleSearchOptionChange}
        onSearch={handleSearch}
        sortOrder={sortOrder}
      />
      <KnowhowList knowhows={knowhows?.posts} />
      <div className="flex self-center relative">
        <Suspense>
          <KnowhowPagination
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={totalItems || 0}
            onPageChange={handlePageChange}
          />
        </Suspense>
        <SearchOptions
          onSearch={handleSearch}
          onSearchOptionChange={handleSearchOptionChange}
          selectedSearchOption={selectedSearchOption}
        />
      </div>
    </section>
  );
}

export default KnowhowContainer;
