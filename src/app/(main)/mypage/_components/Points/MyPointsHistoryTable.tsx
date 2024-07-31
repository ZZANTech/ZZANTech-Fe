"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";
import { formatTime } from "@/app/(main)/boards/_utils";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data, isLoading, isError } = usePointsQuery(userId);

  // 로딩 중일 때
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없거나 비어 있을 때
  if (!data || data.length === 0) {
    return <div>No points history available</div>;
  }

  // 데이터가 정상적으로 로드되었을 때 테이블 렌더링
  return (
    <div>
      <h4>포인트 내역</h4>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>포인트</th>
            <th>내역</th>
          </tr>
        </thead>
        <tbody>
          {/* 추후 디자인에 맞춰 수정 */}
          {data.map((point) => {
            const { formattedDate } = formatTime(point.created_at);
            return (
              <tr key={point.pointId}>
                <td>{formattedDate}</td>
                <td>{point.point}p</td>
                <td>{point.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyPointsHistoryTable;
