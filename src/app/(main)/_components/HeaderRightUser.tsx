import { useUserContext } from "@/provider/contexts/UserContext";
import Link from "next/link";

export default function HeaderRightUser() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-row gap-2.5">
      <Link href={"/mypage"} className="hover:font-bold hover:text-[#04B014]">
        {/* <p>badge</p> */}
        {user?.nickname} 님
      </Link>
      <button>로그아웃</button>
    </div>
  );
}
