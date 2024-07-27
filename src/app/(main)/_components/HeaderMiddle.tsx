import Link from "next/link";

export default function HeaderMiddle() {
  return (
    <div className="w-[700px] flex flex-row items-center justify-center">
      <Link href={"/"} className="MainLinkButton">
        홈
      </Link>
      <Link href={"/boards/votes"} className="MainLinkButton">
        짠-소비구경
      </Link>
      <Link href={"/boards/knowhow"} className="MainLinkButton">
        짠-노하우
      </Link>
      <Link href={"/chat"} className="MainLinkButton">
        살까말까?LIVE
      </Link>
    </div>
  );
}
