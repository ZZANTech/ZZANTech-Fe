import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function usePagination(defaultSortOrder?: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get("page") || "1", 10));
  const [sortOrder, setSortOrder] = useState<string | undefined>(() =>
    defaultSortOrder ? searchParams.get("sortOrder") || defaultSortOrder : undefined
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      if (sortOrder) {
        params.set("sortOrder", sortOrder);
      }
      router.replace(`?${params.toString()}`);
    },
    [searchParams, sortOrder, router]
  );

  const handleSortOrderChange = useCallback(
    (order: string) => {
      if (order !== sortOrder) {
        setSortOrder(order);
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortOrder", order);
        params.set("page", "1");
        router.replace(`?${params.toString()}`);
        setCurrentPage(1);
      }
    },
    [searchParams, router, sortOrder]
  );

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (pageFromParams !== currentPage) {
      setCurrentPage(pageFromParams);
    }
    if (defaultSortOrder) {
      const sortOrderFromParams = searchParams.get("sortOrder") || defaultSortOrder;
      if (sortOrderFromParams !== sortOrder) {
        setSortOrder(sortOrderFromParams);
      }
    }
  }, [searchParams]);

  return { currentPage, sortOrder, handlePageChange, handleSortOrderChange };
}

export default usePagination;
