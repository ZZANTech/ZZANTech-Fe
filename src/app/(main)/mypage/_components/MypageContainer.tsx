"use client";
import InfoContainer from "@/app/(main)/mypage/_components/InfoContainer";
import PointContainer from "@/app/(main)/mypage/_components/PointContainer";
import LevelContainer from "@/app/(main)/mypage/_components/LevelContainer";
import MyPostsContainer from "@/app/(main)/mypage/_components/MyPostsContainer";
import OtherPostsContainer from "@/app/(main)/mypage/_components/OtherPostsContainer";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useEffect } from "react";
import useUserQuery from "@/stores/queries/auth/useUserQuery";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { revalidateRoute } from "@/utils/revalidation";

function MypageContainer() {
  const { user, logOut } = useUserContext();
  const { refetch } = useUserQuery();
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    revalidateRoute("/", "layout");
    router.replace("/");
  };

  useEffect(() => {
    refetch();
  }, []);

  if (!user) return <LoadingSpinner />;
  return (
    <div className="max-w-[540px] flex flex-col lg:mt-[90px] mx-auto mt-3">
      <div className="hidden lg:block lg:mb-10">
        <h1 className="lg:h-[29px] text-xl font-semibold mb-1">마이페이지</h1>
        <p className="h-[19px]">포인트와 등급을 확인해보세요!</p>
      </div>

      <div>
        <InfoContainer />
        <div className="py-6 px-3 lg:px-6 rounded-2xl border border-gray-300 flex flex-col gap-7">
          <PointContainer />
          <hr />
          <LevelContainer />
        </div>
        <div className="mt-12 flex flex-col gap-6">
          <MyPostsContainer />
          <OtherPostsContainer />
        </div>
        <div className="lg:hidden mt-10">
          <Button variant={"white"} onClick={handleLogout} className="w-full h-13">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MypageContainer;
