"use client";
import useKnowhowsQuery from "@/stores/queries/knowhow/post/useKnowhowsQuery";
import { useState, useEffect } from "react";
import KnowhowFilter from "@/app/(main)/boards/knowhow/_components/KnowhowFilter";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { ITEMS_PER_PAGE, SEARCH_OPTIONS, SORT_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import SearchOptions from "@/app/(main)/boards/knowhow/_components/SearchOptions";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";
import usePagination from "@/hooks/usePagination";
import useIsWideScreen from "@/hooks/useIsWideScreen";

type KnowhowContainerProps = {
  isDetailPage?: boolean;
};

function KnowhowContainer({ isDetailPage = false }: KnowhowContainerProps) {
  const { currentPage, sortOrder, handlePageChange, handleSortOrderChange } = usePagination(SORT_OPTIONS[0].value);
  const [selectedSearchOption, setSelectedSearchOption] = useState<TOption["value"]>(SEARCH_OPTIONS[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { isWideScreen } = useIsWideScreen();
  const itemsPerPage = isWideScreen ? ITEMS_PER_PAGE : 10;
  console.log(isDetailPage);
  const { data: knowhows, isPending } = useKnowhowsQuery(
    currentPage,
    itemsPerPage,
    sortOrder || "",
    selectedSearchOption,
    searchKeyword
  );
  const totalItems = knowhows?.posts[0]?.total_count;

  const handleSearchOptionChange = (value: TOption["value"]) => {
    setSelectedSearchOption(value);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    handlePageChange(1);
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage, sortOrder, selectedSearchOption, searchKeyword]);

  return (
    <section>
      {!isDetailPage && (
        <KnowhowFilter
          selectedSearchOption={selectedSearchOption}
          onSortOrderChange={handleSortOrderChange}
          onSearchOptionChange={handleSearchOptionChange}
          onSearch={handleSearch}
          sortOrder={sortOrder || ""}
        />
      )}

      {isPending ? <SkeletonKnowhowList /> : <KnowhowList isDetailPage={isDetailPage} knowhows={knowhows?.posts} />}
      <div className="flex flex-col self-center relative ">
        <Pagination itemsPerPage={itemsPerPage} totalItems={5000} onPageChange={handlePageChange} />
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
