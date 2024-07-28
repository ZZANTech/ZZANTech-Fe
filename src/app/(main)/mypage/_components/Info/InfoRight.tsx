import { BASE_URL } from "@/constants";
import Link from "next/link";

function InfoRight() {
  return (
    <>
      <button className="bg-red-100 ">닉네임 변경</button>
      {/* '닉네임변경 버튼' 굳이 있어야 할까? 회원 정보 병경에 포함되는데?*/}
      <Link href={`${BASE_URL}/mypage/setting`} className="bg-green-100">
        회원 정보 변경
      </Link>
    </>
  );
}

export default InfoRight;
