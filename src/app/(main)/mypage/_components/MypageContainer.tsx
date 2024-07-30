import InfoContainer from "@/app/(main)/mypage/_components/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/PointContainer";

function MypageContainer() {
  return (
    <div className="w-[500px] mx-auto flex flex-col">
      <div>
        <h1 className="font-extrabold text-2xl">마이페이지</h1>
        <p>포인트와 등급을 확인해보세요!</p>
      </div>
      <div className="w-[500px] mx-auto my-5 px-[60px] py-[60px] border border-[#D1D1D1] rounded-lg flex flex-col gap-5">
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
