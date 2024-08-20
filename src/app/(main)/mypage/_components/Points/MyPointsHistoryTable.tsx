"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";
import { formatTime } from "@/app/(main)/boards/_utils";
import { useEffect } from "react";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SmallLoadingSpinner from "@/components/Loading/SmallLoadinSpinner";
import usePagination from "@/hooks/usePagination";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";

  const { currentPage, handlePageChange } = usePagination();
  const itemsPerPage = 10;
  const { data: response, isLoading, refetch } = usePointsQuery(currentPage, itemsPerPage, userId);
  const points = response?.data || [];
  const totalItems = response?.totalCount || 0;

  useEffect(() => {
    refetch();
  }, [currentPage, userId]);

  if (isLoading) {
    return <FlyingTikkle />;
  }

  return (
    <>
      {points.length ? (
        <>
          <div className="w-full mb-4 md:mb-9 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-t border-gray-900 border-basic">
                <tr className="flex w-full justify-between items-center">
                  {["날짜", "적립 포인트", "사용 포인트", "내용"].map((header, index) => (
                    <th
                      key={header}
                      className={`${
                        index === 3 ? "w-2/5" : "w-1/5"
                      } text-center text-gray-800 text-base font-semibold py-4`}
                    >
                      <span className={index < 2 ? "hidden md:inline" : ""}>
                        {index === 1 ? "적립" : index === 2 ? "사용" : header}
                      </span>
                      {index < 2 && <span className="md:hidden">{header}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="flex-col w-full">
                {points.map((point, index) => {
                  const { formattedDate } = formatTime(point.created_at);
                  return (
                    <tr
                      key={point.pointId}
                      className={`flex w-full justify-between items-center border-b border-gray-300 ${
                        index === 0 ? "border-t" : ""
                      }`}
                    >
                      <td className="w-1/5 text-center text-gray-800 text-sm md:text-base py-4">{formattedDate}</td>
                      <td className="w-1/5 text-center text-info-green text-sm md:text-base py-4">
                        {point.point > 0 ? `+${point.point.toLocaleString()}P` : ""}
                      </td>
                      <td className="w-1/5 text-center text-info-red text-sm md:text-base py-4">
                        {point.point < 0 ? `${point.point.toLocaleString()}P` : ""}
                      </td>
                      <td className="w-2/5 text-center text-gray-800 text-sm md:text-base py-4 break-words">
                        {point.reason}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
        </>
      ) : (
        <FlyingTikkle />
      )}
    </>
  );
}

export default MyPointsHistoryTable;
