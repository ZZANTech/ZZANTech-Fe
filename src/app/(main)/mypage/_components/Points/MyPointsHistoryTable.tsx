"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";
import { formatTime } from "@/app/(main)/boards/_utils";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data, isLoading, isError } = usePointsQuery(userId);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!data || data.length === 0) {
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
          {data.map((point) => {
            const { formattedDate } = formatTime(point.created_at);
            return (
              // 첫 번째 항목일 경우 border-top도 주어야 함
              <tr key={point.pointId} className="py-4 border-b border-gray-300 flex justify-between items-center">
                <td className="text-center text-gray-800 text-base">{formattedDate}</td>
                <td className="text-center text-info-green text-base">{point.point}p</td>
                <td className="text-center text-info-red text-base">{point.point}p</td>
                <td className="text-center text-gray-800 text-base">{point.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 추후 페이지네이션 처리 */}
      <div className="w-[428px] h-8 flex justify-start items-center gap-1">1 2 3 4 5</div>
    </div>
  );
}

export default MyPointsHistoryTable;
