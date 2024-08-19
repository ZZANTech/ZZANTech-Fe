import EditPassword from "@/app/(main)/mypage/edit/_components/EditPassword";
import MobileHeader from "@/components/MobileHeader";

function MypageUserInfoEdit() {
  return (
    <>
      <MobileHeader title="비밀번호 변경" />
      <EditPassword />
    </>
  );
}

export default MypageUserInfoEdit;
