"use client";
import useKnowhowsQuery from "@/store/queries/useKnowhowsQuery";

import KnowhowFilter from "./KnowhowFilter";
import KnowhowList from "./KnowhowList";
import KnowhowPagination from "./KnowhowPagination";
import { useState } from "react";

export type TSortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "좋아요순" }
];

function KnowhowContainer() {
  const [sortOrder, setSortOrder] = useState<TSortOption["value"]>(SORT_OPTIONS[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { data: knowhows, isPending, error } = useKnowhowsQuery(currentPage, itemsPerPage, sortOrder);
  // const sortedKnowhows = knowhows?.sort((a, b) => {
  //   if (sortOrder === "latest") {
  //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //   } else if (sortOrder === "popular") {
  //     return b.likesCount - a.likesCount;
  //   }
  //   return 0;
  // });
  // 여기서 fetching 후 filtering 후 list로 보내주기
  knowhows && console.log(knowhows);
  const handleSortOrderChange = (value: TSortOption["value"]) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <KnowhowFilter sortOrder={sortOrder} onSortOrderChange={handleSortOrderChange} />
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
