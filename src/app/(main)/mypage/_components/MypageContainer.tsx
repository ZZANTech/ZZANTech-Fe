import InfoContainer from "@/app/(main)/mypage/_components/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/PointContainer";

function MypageContainer() {
  return (
    <div className="w-[540pt] h-[635px] flex flex-col mt-[92px] mx-auto">
      <div className="mb-10">
        <h1 className="h-[29px] text-xl font-semibold">마이페이지</h1>
        <p className="h-[19px]">포인트와 등급을 확인해보세요!</p>
      </div>
      <div>
        <InfoContainer />
        <hr />
        <PointContainer />
        <hr />
        <LevelContainer />
        <hr />
        <MyPostsContainer />
        <hr />
        <OtherPostsContainer />
      </div>
    </div>
  );
}

export default MypageContainer;
