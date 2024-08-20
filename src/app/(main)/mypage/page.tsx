import MypageContainer from "@/app/(main)/mypage/_components/MypageContainer";
import MobileHeader from "@/components/MobileHeader";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 마이페이지"
};

function MyPage() {
  return (
    <>
      <MobileHeader title="마이페이지" />
      <MypageContainer />
    </>
  );
}

export default MyPage;
