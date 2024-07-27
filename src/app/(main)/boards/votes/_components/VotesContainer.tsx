"use client";

import { useState } from "react";
import useVotesQuery from "@/stores/queries/useVotesQuery";
import Button from "@/components/Button/Button";
import SortButtons from "@/app/(main)/boards/votes/_components/SortButtons";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";

function VotesContainer() {
  const [sortOrder, setSortOrder] = useState("latest");
  const { data: votes, isLoading } = useVotesQuery(sortOrder);
  const { user } = useUserContext();
  const router = useRouter();

  const handleWriteClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/boards/votes/write");
    }
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Button onClick={handleWriteClick}>글쓰기</Button>
      <SortButtons sortOrder={sortOrder} handleSortOrderChange={handleSortOrderChange} />
      <VotesList votes={votes?.data} />
    </section>
  );
}

export default VotesContainer;
