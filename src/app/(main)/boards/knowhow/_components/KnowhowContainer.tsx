"use client";
import useKnowhowsQuery from "@/store/queries/useKnowhowsQuery";

import KnowhowFilter from "./KnowhowFilter";
import KnowhowList from "./KnowhowList";
import KnowhowPagination from "./KnowhowPagination";
import { useState } from "react";
import { SEARCH_OPTIONS, SORT_OPTIONS, TOption } from "../_constants";

const itemsPerPage = 2;

function KnowhowContainer() {
  const [sortOrder, setSortOrder] = useState<TOption["value"]>(SORT_OPTIONS[0].value);
  const [selectedSearchOption, setSelectedSearchOption] = useState<TOption["value"]>(SEARCH_OPTIONS[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: knowhows } = useKnowhowsQuery(
    currentPage,
    itemsPerPage,
    sortOrder,
    selectedSearchOption,
    searchKeyword
  );
  console.log(selectedSearchOption);
  console.log(searchKeyword);
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
        sortOrder={sortOrder}
        selectedSearchOption={selectedSearchOption}
        onSortOrderChange={handleSortOrderChange}
        onSearchOptionChange={handleSearchOptionChange}
        onSearch={handleSearch}
      />
      <KnowhowList knowhows={knowhows?.posts} />
      <KnowhowPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={knowhows?.totalItems || 0}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default KnowhowContainer;
