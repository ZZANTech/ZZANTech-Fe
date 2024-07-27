import InfoContainer from "@/app/(main)/mypage/_components/Info/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/Level/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/Point/PointContainer";
import dynamic from "next/dynamic";

function MypageContainer() {
  return (
    <div className="w-[728px] mx-auto mt-10 flex flex-col">
      <div>
        <h1>마이페이지</h1>
        <p>포인트와 등급을 확인해보세요!</p>
      </div>
      <div className="w-[728px] mx-auto my-5 px-[60px] py-[60px] border border-[#D1D1D1] rounded-lg flex flex-col gap-10">
        <InfoContainer />
        <PointContainer />
        <LevelContainer />
        <MyPostsContainer />
        <OtherPostsContainer />
      </div>
    </div>
  );
}

export default MypageContainer;
