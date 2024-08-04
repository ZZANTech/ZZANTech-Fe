"use client";
import InfoContainer from "@/app/(main)/mypage/_components/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/PointContainer";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useUserContext } from "@/provider/contexts/UserContext";

function MypageContainer() {
  const { user } = useUserContext();

  if (!user) return <LoadingSpinner />;
  return (
    <div className="max-w-[540px] flex flex-col mt-[90px] mx-auto">
      <div className="mb-10">
        <h1 className="h-[29px] text-xl font-semibold mb-1">마이페이지</h1>
        <p className="h-[19px]">포인트와 등급을 확인해보세요!</p>
      </div>
      <div className="">
        <InfoContainer />
        <div className="p-6  rounded-2xl border border-gray-300 flex flex-col gap-6">
          <PointContainer />
          <hr />
          <LevelContainer />
        </div>
        <div className="mt-12 flex flex-col gap-6">
          <MyPostsContainer />
          <OtherPostsContainer />
        </div>
      </div>
    </div>
  );
}

export default MypageContainer;
