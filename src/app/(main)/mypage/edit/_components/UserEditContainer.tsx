import UserEditNickname from "@/app/(main)/mypage/edit/_components/UserEditNickname";
import UserEditPassword from "@/app/(main)/mypage/edit/_components/UserEditPassword";

function UserEditContainer() {
  return (
    <div className="flex flex-col gap-10">
      <UserEditNickname />
      <UserEditPassword />
    </div>
  );
}

export default UserEditContainer;
