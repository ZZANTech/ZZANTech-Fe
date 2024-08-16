"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";
import { formatTime } from "@/app/(main)/boards/_utils";
import { Suspense, useState } from "react";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import SmallLoadingSpinner from "@/components/Loading/SmallLoadinSpinner";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";

  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get("page") || "1", 10));
  const itemsPerPage = 10;
  const { data: response, isLoading } = usePointsQuery(currentPage, itemsPerPage, userId);
  const points = response?.data || [];
  const totalItems = response?.totalCount || 0;

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) {
    return <SmallLoadingSpinner />;
  }

  if (!points || points.length === 0) {
    return <div>포인트 내역이 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className="w-full px-5 mb-9">
        <table className="w-full border-collapse">
          <thead className="border-t border-gray-900 border-basic">
            <tr className="flex w-full justify-between items-center">
              <th className="w-1/5 text-center text-gray-800 text-base font-semibold py-4">날짜</th>
              <th className="w-1/5 text-center text-gray-800 text-base font-semibold py-4">적립 포인트</th>
              <th className="w-1/5 text-center text-gray-800 text-base font-semibold py-4">사용 포인트</th>
              <th className="w-2/5 text-center text-gray-800 text-base font-semibold py-4">내용</th>
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
                  <td className="w-1/5 text-center text-gray-800 text-base py-4">{formattedDate}</td>
                  <td className="w-1/5 text-center text-info-green text-base py-4">
                    {point.point > 0 ? `+${point.point.toLocaleString()}P` : ""}
                  </td>
                  <td className="w-1/5 text-center text-info-red text-base py-4">
                    {point.point < 0 ? `${point.point.toLocaleString()}P` : ""}
                  </td>
                  <td className="w-2/5 text-center text-gray-800 text-base py-4">{point.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Suspense>
        <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
      </Suspense>
    </>
  );
}

export default MyPointsHistoryTable;
