import InfoContainer from "@/app/(main)/mypage/_components/Info/InfoContainer";
import LevelContainer from "@/app/(main)/mypage/_components/Level/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPosts/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPosts/OtherPostsContainer";
import PointContainer from "@/app/(main)/mypage/_components/Point/PointContainer";

export default function MypageContainer() {
  return (
    <>
      <InfoContainer />
      <PointContainer />
      <LevelContainer />
      <MyPostsContainer />
      <OtherPostsContainer />
    </>
  );
}
