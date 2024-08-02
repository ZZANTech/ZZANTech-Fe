"use client";
import { MY_POSTS_FILTER_OPTION, TOption, VOTES } from "@/app/(main)/boards/knowhow/_constants";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import MyKnowhowContainer from "@/app/(main)/mypage/posts/_components/MyKnowhowContainer";
import MyVotesContainer from "@/app/(main)/mypage/posts/_components/MyVotesContainer";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserContext } from "@/provider/contexts/UserContext";

function MyPostsContainer() {
  const { user } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilterOption = searchParams.get("filter_option") || MY_POSTS_FILTER_OPTION[0].value;
  const [filterOption, setFilterOption] = useState<TOption["value"]>(initialFilterOption);

  const handleFilterOptionChange = (option: TOption["value"]): void => {
    setFilterOption(option);
    const params = new URLSearchParams(window.location.search);
    params.set("filter_option", option);
    params.delete("page");
    router.replace(`?${params.toString()}`);
  };
  useEffect(() => {
    setFilterOption(initialFilterOption);
  }, [initialFilterOption]);

  return (
    <section>
      <FilterOption options={MY_POSTS_FILTER_OPTION} onFilterOptionChange={handleFilterOptionChange} />
      {user && (filterOption === VOTES ? <MyVotesContainer user={user} /> : <MyKnowhowContainer user={user} />)}
    </section>
  );
}

export default MyPostsContainer;
