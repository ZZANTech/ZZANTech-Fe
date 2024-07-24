"use client";
import useKnowhowsQuery from "@/stores/queries/useKnowhowsQuery";
import KnowhowFilter from "./KnowhowFilter";
import KnowhowList from "./KnowhowList";
import KnowhowPagination from "./KnowhowPagination";
import { useState } from "react";
import { ITEMS_PER_PAGE, SEARCH_OPTIONS, SORT_OPTIONS, TOption } from "../_constants";

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
      />
      <KnowhowList knowhows={knowhows?.posts} />
      <KnowhowPagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems || 0}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default KnowhowContainer;
