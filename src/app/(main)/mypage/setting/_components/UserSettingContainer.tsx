import UserSettingPWContainer from "@/app/(main)/mypage/setting/_components/Password/UserSettingPWContainer";
import UserSettingNickname from "@/app/(main)/mypage/setting/_components/UserSettingNickname";
import UserSettingPassword from "@/app/(main)/mypage/setting/_components/UserSettingPassword";
import UserSettingPassword22 from "@/app/(main)/mypage/setting/_components/UserSettingPassword copy";

function UserSettingContainer() {
  return (
    <div className="flex flex-col mx-auto my-10 w-[418px] bg-yellow-100 gap-10">
      <h1 className="text-2xl text-bold">회원정보 변경</h1>
      <UserSettingNickname />
      <UserSettingPWContainer />
      <UserSettingPassword />
      <UserSettingPassword22 />
    </div>
  );
}

export default UserSettingContainer;
