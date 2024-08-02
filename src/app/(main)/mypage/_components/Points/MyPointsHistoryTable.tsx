"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";
import { formatTime } from "@/app/(main)/boards/_utils";
import { Suspense, useState } from "react";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { useSearchParams } from "next/navigation";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";

  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get("page") || "1", 10));
  const itemsPerPage = 2;
  const { data: response, isLoading } = usePointsQuery(currentPage, itemsPerPage, userId);
  const points = response?.data || [];
  const totalItems = response?.totalCount || 0;

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!points || points.length === 0) {
    return <div>포인트 내역이 존재하지 않습니다.</div>;
  }

  return (
    <div>
      <table className="w-full flex-col">
        <thead className="py-4 border-t border-basic flex justify-between items-center">
          <th className="text-center text-gray-800 text-base font-semibold">날짜</th>
          <th className="text-center text-gray-800 text-base font-semibold">적립 포인트</th>
          <th className="text-center text-gray-800 text-base font-semibold">사용 포인트</th>
          <th className="text-center text-gray-800 text-base font-semibold">사용 내역</th>
        </thead>
        <tbody className="w-full flex-col">
          {points.map((point) => {
            const { formattedDate } = formatTime(point.created_at);
            return (
              // 첫 번째 항목일 경우 border-top도 주어야 함
              <tr key={point.pointId} className="py-4 border-b border-gray-300 flex justify-between items-center">
                <td className="text-center text-gray-800 text-base">{formattedDate}</td>
                <td className="text-center text-info-green text-base">
                  {point.point > 0 ? `+${point.point.toLocaleString()}P` : ""}
                </td>
                <td className="text-center text-info-red text-base">
                  {point.point < 0 ? `${point.point.toLocaleString()}P` : ""}
                </td>
                <td className="text-center text-gray-800 text-base">{point.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Suspense>
        <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
      </Suspense>
    </div>
  );
}

export default MyPointsHistoryTable;
