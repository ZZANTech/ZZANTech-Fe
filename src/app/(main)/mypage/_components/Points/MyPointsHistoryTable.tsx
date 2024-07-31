"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import usePointsQuery from "@/stores/queries/usePointsQuery";

function MyPointsHistoryTable() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data } = usePointsQuery(userId);

  return (
    <div>
      <h4>포인트 내역</h4>
      <div>표</div>
    </div>
  );
}

export default MyPointsHistoryTable;
