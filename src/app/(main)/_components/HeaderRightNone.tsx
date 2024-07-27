import Link from "next/link";

export default function HeaderRightNone() {
  return (
    <Link href={"/login"} className="MainLinkButton">
      로그인
    </Link>
  );
}
