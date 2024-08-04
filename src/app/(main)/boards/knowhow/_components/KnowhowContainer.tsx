"use client";
import useKnowhowsQuery from "@/stores/queries/knowhow/post/useKnowhowsQuery";
import { Suspense, useEffect, useState } from "react";
import KnowhowFilter from "@/app/(main)/boards/knowhow/_components/KnowhowFilter";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import {
  ITEMS_PER_PAGE,
  SEARCH_OPTIONS,
  SORT_LATEST,
  SORT_OPTIONS,
  TOption
} from "@/app/(main)/boards/knowhow/_constants";
import SearchOptions from "@/app/(main)/boards/knowhow/_components/SearchOptions";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/provider/contexts/ModalContext";
import useAlertModal from "@/hooks/useAlertModal";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";

function KnowhowContainer() {
  const { displayDefaultAlert } = useAlertModal();
  const { open } = useModal();
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<TOption["value"]>(SORT_OPTIONS[0].value);
  const [selectedSearchOption, setSelectedSearchOption] = useState<TOption["value"]>(SEARCH_OPTIONS[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: knowhows, isPending } = useKnowhowsQuery(
    currentPage,
    ITEMS_PER_PAGE,
    sortOrder,
    selectedSearchOption,
    searchKeyword
  );
  const totalItems = knowhows?.posts[0]?.total_count;

  const handleSortOrderChange = (value: TOption["value"]) => {
    const params = new URLSearchParams(window.location.search);
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
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    params.set("sortOrder", sortOrder); //
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
    const sortFromParams = searchParams.get("sortOrder") || SORT_LATEST;
    if (sortOrder !== sortFromParams) {
      setSortOrder(sortFromParams);
    }
  }, [searchParams, currentPage]);

  return (
    <section>
      <KnowhowFilter
        selectedSearchOption={selectedSearchOption}
        onSortOrderChange={handleSortOrderChange}
        onSearchOptionChange={handleSearchOptionChange}
        onSearch={handleSearch}
        sortOrder={sortOrder}
      />
      {isPending ? <SkeletonKnowhowList /> : <KnowhowList knowhows={knowhows?.posts} />}
      <div className="flex flex-col self-center relative">
        <Suspense>
          <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems || 0} onPageChange={handlePageChange} />
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
