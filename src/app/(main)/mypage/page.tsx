import MypageContainer from "@/app/(main)/mypage/_components/MypageContainer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 마이페이지"
};

function MyPage() {
  return <MypageContainer />;
}

export default MyPage;
