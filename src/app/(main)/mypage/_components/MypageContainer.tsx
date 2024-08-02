import InfoContainer from "@/app/(main)/mypage/_components/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/PointContainer";

function MypageContainer() {
  return (
    <div className="w-[540pt] flex flex-col mt-[92px] mx-auto">
      <div className="mb-10">
        <h1 className="h-[29px] text-xl font-semibold mb-1">마이페이지</h1>
        <p className="h-[19px]">포인트와 등급을 확인해보세요!</p>
      </div>
      <div className="">
        <InfoContainer />
        <div className="p-6 my-8 rounded-3xl border border-gray-300 flex flex-col gap-6">
          <LevelContainer />
          <hr />
          <PointContainer />
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
